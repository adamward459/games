import { createBoard } from "./chess";
import Piece from "./piece";

const board = createBoard();

export default function Board() {
  const onMouseEnter = () => {};
  return (
    <div className="board">{board.map((row) => row.map((col) => <Piece key={col.x + col.y} x={col.x} y={col.y} color={col.color} symbol={col.symbol} />))}</div>
  );
}
