export type Position = {
  x: number;
  y: number;
};

export type Piece = {
  x: number;
  y: number;
  color: "brown" | "white";
  symbol: PieceSymbol;
  side?: SIDE;
};

export type Board = Piece[][];
export type PieceSymbol = (typeof AVAILABLE_SYMBOLS)[number];
export type SIDE = "black" | "white";

export const PIECES_PER_ROW = 8;
export const PIECE_HEIGHT = 60;
export const KING = "&#x2654";
export const QUEEN = "&#x2655";
export const ROOK = "&#x2656";
export const BISHOP = "&#x2657";
export const KNIGHT = "&#x2658";
export const PAWN = "&#x2659";
export const DEFAULT_SYMBOL_POSITIONS = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK] as const;
export const AVAILABLE_SYMBOLS = [KING, QUEEN, ROOK, BISHOP, KNIGHT, PAWN, ""] as const;

export function createBoard() {
  const matrix: Board = [];

  for (let i = 0; i < PIECES_PER_ROW; i++) {
    matrix[i] = [];
    for (let j = 0; j < PIECES_PER_ROW; j++) {
      const color = (i + j) % 2 === 0 ? "white" : "brown";
      let symbol: PieceSymbol = "";
      let side: SIDE | undefined;

      if (i === 0 || i === 1) {
        side = "black";
      } else if (i === PIECES_PER_ROW - 1 || i === PIECES_PER_ROW - 2) {
        side = "white";
      }

      if (i === 0 || i === PIECES_PER_ROW - 1) {
        symbol = DEFAULT_SYMBOL_POSITIONS[j];
      } else if (i === 1 || i === PIECES_PER_ROW - 2) {
        symbol = PAWN;
      }

      matrix[i][j] = {
        x: j,
        y: i,
        color,
        symbol,
        side,
      };
    }
  }

  return matrix;
}

export function predictMove(board: Board, piece: Piece): Position[] {
  let possibleMoves: Position[] = [];

  switch (piece.symbol) {
    case ROOK:
      possibleMoves = [];
      // Left
      for (let l = piece.x - 1; l >= 0; l--) {
        if (board[piece.y][l].symbol === "") {
          possibleMoves.push({ x: l, y: piece.y });
        } else if (board[piece.y][l].side !== piece.side && piece.side) {
          possibleMoves.push({ x: l, y: piece.y });
          break;
        }
      }

      // Bottom
      for (let b = piece.y + 1; b < PIECES_PER_ROW; b++) {
        if (board[b][piece.x].symbol === "") {
          possibleMoves.push({ x: piece.x, y: b });
        } else if (board[b][piece.x].side !== piece.side && piece.side) {
          possibleMoves.push({ x: piece.x, y: b });
          break;
        }
      }

      // Right
      for (let r = piece.x + 1; r < PIECES_PER_ROW; r++) {
        if (board[piece.y][r].symbol === "") {
          possibleMoves.push({ x: r, y: piece.y });
        } else if (board[piece.y][r].side !== piece.side && piece.side) {
          possibleMoves.push({ x: r, y: piece.y });
          break;
        }
      }

      // Top
      for (let t = piece.y - 1; t >= 0; t--) {
        if (board[t][piece.x].symbol === "") {
          possibleMoves.push({ x: piece.x, y: t });
        } else if (board[t][piece.x].side !== piece.side && piece.side) {
          possibleMoves.push({ x: piece.x, y: t });
          break;
        }
      }

      return possibleMoves;
    case KNIGHT:
      return possibleMoves;
    default:
      throw new Error(`Unexpected symbol! ${piece.symbol}`);
  }
}
