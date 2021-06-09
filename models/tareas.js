const Tarea = require("./tarea");
/**
 *  _listado:
 *      {'uuidv4-12323-2323': {id:12, desc:asd, completadoEn:2000} }
 */
class Tareas {
  _listado = {};

  get ListadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  listadoCompleto() {
    console.log('\n');
    this.ListadoArr.forEach( (tarea, i) =>{
        
        const idx = `${ i + 1}`.green;
        const { desc, completadoEn } = tarea;
        const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
        console.log(`${idx} ${desc} :: ${estado}`)
    })

  }

  listarcompletadas( completadas = true ) {
    console.log('\n');
    let contador = 0;
    this.ListadoArr.forEach( (tarea) =>{
        
        const { desc, completadoEn } = tarea;
        const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
        if( completadas ){
            if(completadoEn) {
                contador +=1;
                console.log(`${ (contador.toString() + '.').green } ${desc} :: ${completadoEn.green}`);
            }
            
        } else {
            if( !completadoEn ) {
                contador +=1;
                console.log(`${ (contador.toString() + '.').green } ${desc} :: ${estado.red}`);
            }
        }
        
    })
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea( id = ''){
      if( this._listado[id]){
          delete this._listado[id];
      }
  }

  cargarTareas( tareas = []){
      tareas.forEach( tarea =>{
          this._listado[tarea.id] = tarea;
      })
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  completarTarea( ids = []){
    ids.forEach( id =>{
      const tarea = this._listado[id];
      if( !tarea.completadoEn ){
          tarea.completadoEn = new Date().toISOString();
      }
    });

    this.ListadoArr.forEach( tarea => {
      if( !ids.includes(tarea.id) ){
        this._listado[tarea.id].completadoEn = null;
      }
    })
  
  }
}



module.exports = Tareas;
