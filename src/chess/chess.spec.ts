import { beforeEach, describe, it } from "vitest";
import { Board, DEFAULT_SYMBOL_POSITIONS, PAWN, PIECES_PER_ROW, Position, ROOK, createBoard, predictMove } from "./chess";

describe("predictMoves", () => {
  let board: Board;

  beforeEach(() => {
    board = createBoard();
  });

  it("should work correctly for KNIGHT", ({ expect }) => {
    /*
      0 1 2 3 4 5 6 7
    0 . . . . . . . .
    1 . . . . . . . .
    2 . . . . . P . .
    3 . . . . . . . .
    4 . . . . K . . .
    5 . . P . . . . .
    6 . . . P . . . .
    7 . . . . . . . .
    */
  });

  /*
      0 1 2 3 4 5 6 7
    0 . . . . . . . .
    1 . . . . . . . .
    2 . . . . P . . .
    3 . . . . . . . .
    4 . . P . r . P .
    5 . . . . . . . .
    6 . . . . . . . .
    7 . . . . P . . .
    */
  it("should work correctly for ROOK", ({ expect }) => {
    board[4][4].symbol = ROOK;
    board[4][4].side = "black";

    board[2][4].symbol = PAWN;
    board[2][4].side = "white";

    board[4][2].symbol = PAWN;
    board[4][2].side = "white";

    board[4][6].symbol = PAWN;
    board[4][6].side = "white";

    board[7][4].symbol = PAWN;
    board[7][4].side = "white";

    board[6][4].symbol = "";
    board[6][4].side = undefined;

    const moves = predictMove(board, board[4][4]);
    const expectedMoves: Position[] = [
      { x: 3, y: 4 },
      { x: 2, y: 4 },
      { x: 4, y: 5 },
      { x: 4, y: 6 },
      { x: 4, y: 7 },
      { x: 5, y: 4 },
      { x: 6, y: 4 },
      { x: 4, y: 3 },
      { x: 4, y: 2 },
    ];
    expect(moves).toEqual(expectedMoves);
  });
});

describe("createBoard", () => {
  it("should work correctly", ({ expect }) => {
    const board = createBoard();

    expect(board.length).toEqual(PIECES_PER_ROW);

    board.forEach((row, index) => {
      expect(row.length).toEqual(PIECES_PER_ROW);

      const symbols = row.map((r) => r.symbol);
      const sides = row.map((r) => r.side);

      if (index === 0 || index === 1) {
        expect(sides).toEqual(new Array(PIECES_PER_ROW).fill("black"));
      } else if (index === PIECES_PER_ROW - 1 || index === PIECES_PER_ROW - 2) {
        expect(sides).toEqual(new Array(PIECES_PER_ROW).fill("white"));
      }

      if (index === 0 || index === PIECES_PER_ROW - 1) {
        expect(symbols).toEqual(DEFAULT_SYMBOL_POSITIONS);
      } else if (index === 1 || index === PIECES_PER_ROW - 2) {
        expect(symbols).toEqual(new Array(PIECES_PER_ROW).fill(PAWN));
      } else {
        expect(symbols).toEqual(new Array(PIECES_PER_ROW).fill(""));
      }
    });
  });
});
