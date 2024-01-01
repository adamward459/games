import { Piece } from "./chess";

type Prop = Piece;

export default function Piece({ x, y, color, symbol }: Prop) {
  const onMouseEnter = () => {};

  return (
    <div
      draggable
      onDragStart={() => {}}
      onMouseEnter={onMouseEnter}
      className="piece"
      style={{
        left: x,
        top: y,
        backgroundColor: color,
      }}
      dangerouslySetInnerHTML={{ __html: symbol }}
    ></div>
  );
}
