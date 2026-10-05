import { useState } from "react";
import "./App.css";

// Cada casilla es un botón que muestra "X", "O" o nada
function Casilla({ valor, onClick }) {
  return (
    <button className="casilla" onClick={onClick}>
      {valor}
    </button>
  );
}

// Revisa las 8 combinaciones posibles para ganar
function calcularGanador(casillas) {
  const lineas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
    [0, 4, 8], [2, 4, 6],            // diagonales
  ];
  for (const [a, b, c] of lineas) {
    if (casillas[a] && casillas[a] === casillas[b] && casillas[a] === casillas[c]) {
      return casillas[a];
    }
  }
  return null;
}

function App() {
  const [casillas, setCasillas] = useState(Array(9).fill(null));
  const [turnoX, setTurnoX] = useState(true);

  const ganador = calcularGanador(casillas);
  const empate = !ganador && casillas.every((c) => c !== null);

  function manejarClick(i) {
    // Si la casilla está ocupada o ya hay ganador, no hacer nada
    if (casillas[i] || ganador) return;

    const nuevas = [...casillas]; // copia del arreglo (nunca mutar el estado)
    nuevas[i] = turnoX ? "X" : "O";
    setCasillas(nuevas);
    setTurnoX(!turnoX);
  }

  function reiniciar() {
    setCasillas(Array(9).fill(null));
    setTurnoX(true);
  }

  let mensaje;
  if (ganador) mensaje = `🏆 Ganador: ${ganador}`;
  else if (empate) mensaje = "🤝 ¡Empate!";
  else mensaje = `Turno de: ${turnoX ? "X" : "O"}`;

  return (
    <div className="juego">
      <h1>Tic Tac Toe</h1>
      <p className="mensaje">{mensaje}</p>

      <div className="tablero">
        {casillas.map((valor, i) => (
          <Casilla key={i} valor={valor} onClick={() => manejarClick(i)} />
        ))}
      </div>

      <button className="reiniciar" onClick={reiniciar}>
        Reiniciar
      </button>
    </div>
  );
}

export default App;