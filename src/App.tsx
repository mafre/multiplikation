import React, { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

const ROWS = 12;
const COLS = 12;

function App() {
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>({
    row: 2,
    col: 3,
  });

  const rows = selectedCell ? selectedCell.row + 1 : 0;
  const cols = selectedCell ? selectedCell.col + 1 : 0;
  const total = rows * cols;

  const repeatedAddition = useMemo(() => {
    if (!selectedCell) return "";
    return Array.from({ length: rows }, () => cols).join(" + ");
  }, [selectedCell, rows, cols]);

  function reset() {
    setSelectedCell(null);
  }

  function isFilled(row: number, col: number) {
    if (!selectedCell) return false;
    return row <= selectedCell.row && col <= selectedCell.col;
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">multiplikation med rutor</p>
        <h1>Multiplikation</h1>
        <p className="subtitle">
          Klicka på en ruta. Då ritas en rektangel från övre vänstra hörnet till
          den rutan. Rektangeln visar multiplikation som rader gånger kolumner.
        </p>
      </section>

      <section className="editor">
        <div className="toolbar">
          <div>
            <p className="label">Fri byggyta</p>
            <h2>
              {selectedCell
                ? `${rows} × ${cols} = ${total}`
                : "Klicka i rutnätet"}
            </h2>
          </div>

          <button className="reset" onClick={reset}>
            <RotateCcw size={18} />
            Rensa
          </button>
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
          aria-label="Rutnät för multiplikation"
        >
          {Array.from({ length: ROWS }).map((_, row) =>
            Array.from({ length: COLS }).map((__, col) => {
              const filled = isFilled(row, col);
              const isSelected =
                row === selectedCell?.row && col === selectedCell?.col;
              const edge =
                selectedCell &&
                filled &&
                (row === selectedCell.row || col === selectedCell.col);

              return (
                <button
                  key={`${row}-${col}`}
                  className={`cell ${filled ? "filled" : ""} ${edge ? "edge" : ""}`}
                  onClick={() => setSelectedCell({ row, col })}
                  aria-label={`Rad ${row + 1}, kolumn ${col + 1}`}
                  title={`${row + 1} × ${col + 1}`}
                >
                  {isSelected ? "×" : ""}
                </button>
              );
            }),
          )}
        </div>

        <div className="explanation">
          {selectedCell ? (
            <>
              <div className="fact">
                <span>Rader</span>
                <strong>{rows}</strong>
              </div>
              <div className="fact">
                <span>Kolumner</span>
                <strong>{cols}</strong>
              </div>
              <div className="fact answer">
                <span>Totalt</span>
                <strong>{total}</strong>
              </div>
              <p className="addition">
                Som upprepad addition:{" "}
                <strong>
                  {repeatedAddition} = {total}
                </strong>
              </p>
            </>
          ) : (
            <p className="empty">Välj en ruta för att skapa en rektangel.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
