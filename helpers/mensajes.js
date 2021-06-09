const { resolve } = require("path");
const { stdout } = require("process");

require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=========================".green);
    console.log(" Seleccione una opcion".green);
    console.log("=========================\n".green);

    console.log(`${"1.".green} Crear Tareas`);
    console.log(`${"2.".green} Lis0tar Tareas`);
    console.log(`${"3.".green} Listar Tareas Completas`);
    console.log(`${"4.".green} listar Tareas Pendientes`);
    console.log(`${"5.".green} Completar Tarea(s)`);
    console.log(`${"6.".green} Borrar Tarea`);
    console.log(`${"0.".green} Salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: stdout,
    });

    readline.question("Seleccione una opcion: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: stdout,
    });

    readline.question(`\nPresione ${"ENTER".blue} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
