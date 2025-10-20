import * as readline from "readline";

// Constructor Tarea

function Tarea(titulo, descripcion) {
  this.id = Date.now();
  this.titulo = titulo;
  this.descripcion = descripcion || "";
  this.estado = "Pendiente";
  this.creada = new Date();
}

// Métodos del prototipo

Tarea.prototype.cambiarEstado = function (nuevoEstado) {
  const estadosValidos = ["Pendiente", "En curso", "Terminada", "Cancelada"];
  if (estadosValidos.includes(nuevoEstado)) {
    this.estado = nuevoEstado;
    console.log(`Estado de "${this.titulo}" actualizado a: ${nuevoEstado}`);
  } else {
    console.log("Estado inválido. Intente con: Pendiente, En curso, Terminada o Cancelada.");
  }
};

Tarea.prototype.mostrarInfo = function () {
  console.log(` [${this.estado}] ${this.titulo} - ${this.descripcion}`);
};

// Constructor ListaTareas

function ListaTareas() {
  this.tareas = [];
}

ListaTareas.prototype.agregarTarea = function (tarea) {
  this.tareas.push(tarea);
  console.log(`Tarea "${tarea.titulo}" agregada correctamente.`);
};

ListaTareas.prototype.eliminarTarea = function (id) {
  const longitudInicial = this.tareas.length;
  this.tareas = this.tareas.filter(t => t.id !== id);
  if (this.tareas.length < longitudInicial) {
    console.log("Tarea eliminada correctamente.");
  } else {
    console.log("No se encontró una tarea con ese ID.");
  }
};

ListaTareas.prototype.mostrarTareas = function () {
  if (this.tareas.length === 0) {
    console.log("No hay tareas registradas.");
  } else {
    console.log("\n Lista de tareas ");
    this.tareas.forEach((t, i) => console.log(`${i + 1}. ${t.titulo} [${t.estado}] - ID: ${t.id}`));
  }
};

ListaTareas.prototype.buscarPorEstado = function (estado) {
  return this.tareas.filter(t => t.estado === estado);
};

// Interfaz de consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lista = new ListaTareas();

function mostrarMenu() {
  console.log(`
    GESTOR DE TAREAS
1. Agregar tarea
2. Mostrar tareas
3. Cambiar estado de una tarea
4. Eliminar tarea
5. Mostrar tareas por estado
6. Salir
`);
  rl.question("Elija una opción: ", manejarOpcion);
}

function manejarOpcion(opcion) {
  switch (opcion) {
    case "1":
      rl.question("Título de la tarea: ", (titulo) => {
        rl.question("Descripción (opcional): ", (descripcion) => {
          const tarea = new Tarea(titulo, descripcion);
          lista.agregarTarea(tarea);
          mostrarMenu();
        });
      });
      break;

    case "2":
      lista.mostrarTareas();
      mostrarMenu();
      break;

    case "3":
      lista.mostrarTareas();
      rl.question("Ingrese el ID de la tarea: ", (idStr) => {
        const id = Number(idStr);
        const tarea = lista.tareas.find(t => t.id === id);
        if (!tarea) {
          console.log("Tarea no encontrada.");
          return mostrarMenu();
        }
        rl.question("Nuevo estado (Pendiente / En curso / Terminada / Cancelada): ", (nuevoEstado) => {
          tarea.cambiarEstado(nuevoEstado);
          mostrarMenu();
        });
      });
      break;

    case "4":
      lista.mostrarTareas();
      rl.question("Ingrese el ID de la tarea a eliminar: ", (idStr) => {
        lista.eliminarTarea(Number(idStr));
        mostrarMenu();
      });
      break;

    case "5":
      rl.question("Ingrese el estado a filtrar: ", (estado) => {
        const filtradas = lista.buscarPorEstado(estado);
        if (filtradas.length === 0) {
          console.log(`No hay tareas con estado "${estado}".`);
        } else {
          filtradas.forEach(t => t.mostrarInfo());
        }
        mostrarMenu();
      });
      break;

    case "6":
      console.log("Saliendo del gestor de tareas...");
      rl.close();
      break;

    default:
      console.log("Opción inválida. Intente nuevamente.");
      mostrarMenu();
  }
}

// Iniciar programa
mostrarMenu();