import * as readline from "readline";

class Calculadora {
  sumar(a, b) {
    return a + b;
  }

  restar(a, b) {
    return a - b;
  }

  multiplicar(a, b) {
    return a * b;
  }

  dividir(a, b) {
    if (b === 0) {
      console.log("No se puede dividir entre cero.");
      return null;
    }
    return a / b;
  }
}

const calc = new Calculadora();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarMenu() {
  console.log(`

     CALCULADORA
1. Sumar
2. Restar
3. Multiplicar
4. Dividir
5. Salir
`);
  rl.question("Elija una opción: ", manejarOpcion);
}

function manejarOpcion(opcion) {
  switch (opcion) {
    case "1":
      operar("sumar");
      break;
    case "2":
      operar("restar");
      break;
    case "3":
      operar("multiplicar");
      break;
    case "4":
      operar("dividir");
      break;
    case "5":
      console.log(" Saliendo de la calculadora...");
      rl.close();
      break;
    default:
      console.log(" Opción inválida. Intente nuevamente.");
      mostrarMenu();
  }
}

function operar(tipoOperacion) {
  rl.question("Ingrese el primer número: ", (num1Str) => {
    rl.question("Ingrese el segundo número: ", (num2Str) => {
      const num1 = Number(num1Str);
      const num2 = Number(num2Str);

      let resultado;

      switch (tipoOperacion) {
        case "sumar":
          resultado = calc.sumar(num1, num2);
          break;
        case "restar":
          resultado = calc.restar(num1, num2);
          break;
        case "multiplicar":
          resultado = calc.multiplicar(num1, num2);
          break;
        case "dividir":
          resultado = calc.dividir(num1, num2);
          break;
      }

      if (resultado !== null && resultado !== undefined) {
        console.log(` Resultado: ${resultado}`);
      }

      mostrarMenu();
    });
  });
}

mostrarMenu();
