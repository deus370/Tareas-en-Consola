require("colors");

const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBoradas,
  confirmar,
  mostrarEstado
} = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/guardardb");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    //Establecer las tareas que ya existen en el archivo db.
    tareas.cargarTareas(tareasDB);
  }

  do {
    //Imprime el menu y espera la respuesta con el metodo await.
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //Crear nueva tarea
        const desc = await leerInput("Descripccion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        //Listar las tareas
        tareas.listadoCompleto();
        break;
      case "3":
        //Listar tareas Completadas
        tareas.listarcompletadas(true);
        break;
      case "4":
        //Listar tareas incompletas
        tareas.listarcompletadas(false);
        break;
      case "5":
        //Completar tarea.
        const ids = await mostrarEstado( tareas.ListadoArr );
        tareas.completarTarea(ids);
        break;
      case "6":
        //Borrar tareas
        const id = await listadoTareasBoradas(tareas.ListadoArr);
        if (id !== "0") {
          const ok = await confirmar("Deseas continuar?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada exitosamente!!".green);
          }
        }
        break;
    }

    guardarDB(tareas.ListadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
