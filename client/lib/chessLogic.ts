// Chess piece types
export type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
export type PieceColor = "white" | "black";

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean;
}

export type Square = ChessPiece | null;
export type Board = Square[][];

export interface Move {
  from: { row: number; col: number };
  to: { row: number; col: number };
  piece: ChessPiece;
  capturedPiece?: ChessPiece;
  isEnPassant?: boolean;
  isCastling?: boolean;
  isPromotion?: boolean;
  promotionPiece?: PieceType;
}

export interface GameState {
  board: Board;
  currentPlayer: PieceColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  winner?: PieceColor | 'draw';
  moves: Move[];
  enPassantTarget?: { row: number; col: number };
  canCastle: {
    white: { kingside: boolean; queenside: boolean };
    black: { kingside: boolean; queenside: boolean };
  };
}

// Initial chess board setup
export const createInitialBoard = (): Board => [
  [
    { type: "rook", color: "black", hasMoved: false },
    { type: "knight", color: "black", hasMoved: false },
    { type: "bishop", color: "black", hasMoved: false },
    { type: "queen", color: "black", hasMoved: false },
    { type: "king", color: "black", hasMoved: false },
    { type: "bishop", color: "black", hasMoved: false },
    { type: "knight", color: "black", hasMoved: false },
    { type: "rook", color: "black", hasMoved: false },
  ],
  Array(8).fill(null).map(() => ({ type: "pawn", color: "black", hasMoved: false })),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null).map(() => ({ type: "pawn", color: "white", hasMoved: false })),
  [
    { type: "rook", color: "white", hasMoved: false },
    { type: "knight", color: "white", hasMoved: false },
    { type: "bishop", color: "white", hasMoved: false },
    { type: "queen", color: "white", hasMoved: false },
    { type: "king", color: "white", hasMoved: false },
    { type: "bishop", color: "white", hasMoved: false },
    { type: "knight", color: "white", hasMoved: false },
    { type: "rook", color: "white", hasMoved: false },
  ],
];

export const createInitialGameState = (): GameState => ({
  board: createInitialBoard(),
  currentPlayer: "white",
  isCheck: false,
  isCheckmate: false,
  isStalemate: false,
  moves: [],
  canCastle: {
    white: { kingside: true, queenside: true },
    black: { kingside: true, queenside: true },
  },
});

// Helper functions
export const isValidPosition = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

export const deepCopyBoard = (board: Board): Board => {
  return board.map(row => row.map(square => square ? { ...square } : null));
};

export const findKing = (board: Board, color: PieceColor): { row: number; col: number } | null => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === "king" && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
};

// Check if a square is under attack by the opponent
export const isSquareUnderAttack = (
  board: Board,
  row: number,
  col: number,
  byColor: PieceColor
): boolean => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === byColor) {
        if (canPieceAttackSquare(board, r, c, row, col)) {
          return true;
        }
      }
    }
  }
  return false;
};

// Check if a piece can attack a specific square
const canPieceAttackSquare = (
  board: Board,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean => {
  const piece = board[fromRow][fromCol];
  if (!piece) return false;

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  const absRowDiff = Math.abs(rowDiff);
  const absColDiff = Math.abs(colDiff);

  switch (piece.type) {
    case "pawn":
      const direction = piece.color === "white" ? -1 : 1;
      return rowDiff === direction && absColDiff === 1;

    case "rook":
      return (rowDiff === 0 || colDiff === 0) && 
             isPathClear(board, fromRow, fromCol, toRow, toCol);

    case "bishop":
      return absRowDiff === absColDiff && 
             isPathClear(board, fromRow, fromCol, toRow, toCol);

    case "queen":
      return (rowDiff === 0 || colDiff === 0 || absRowDiff === absColDiff) && 
             isPathClear(board, fromRow, fromCol, toRow, toCol);

    case "knight":
      return (absRowDiff === 2 && absColDiff === 1) || 
             (absRowDiff === 1 && absColDiff === 2);

    case "king":
      return absRowDiff <= 1 && absColDiff <= 1;

    default:
      return false;
  }
};

// Check if path is clear between two squares
const isPathClear = (
  board: Board,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean => {
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
  
  const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
  const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

  for (let i = 1; i < steps; i++) {
    const checkRow = fromRow + i * rowStep;
    const checkCol = fromCol + i * colStep;
    if (board[checkRow][checkCol] !== null) {
      return false;
    }
  }
  return true;
};

// Generate all possible moves for a piece
export const generatePossibleMoves = (
  board: Board,
  row: number,
  col: number,
  gameState: GameState
): Move[] => {
  const piece = board[row][col];
  if (!piece) return [];

  const moves: Move[] = [];

  switch (piece.type) {
    case "pawn":
      moves.push(...generatePawnMoves(board, row, col, piece, gameState));
      break;
    case "rook":
      moves.push(...generateRookMoves(board, row, col, piece));
      break;
    case "bishop":
      moves.push(...generateBishopMoves(board, row, col, piece));
      break;
    case "queen":
      moves.push(...generateQueenMoves(board, row, col, piece));
      break;
    case "knight":
      moves.push(...generateKnightMoves(board, row, col, piece));
      break;
    case "king":
      moves.push(...generateKingMoves(board, row, col, piece, gameState));
      break;
  }

  // Filter out moves that would put own king in check
  return moves.filter(move => !wouldMoveResultInCheck(board, move, piece.color));
};

const generatePawnMoves = (
  board: Board,
  row: number,
  col: number,
  piece: ChessPiece,
  gameState: GameState
): Move[] => {
  const moves: Move[] = [];
  const direction = piece.color === "white" ? -1 : 1;
  const startRow = piece.color === "white" ? 6 : 1;

  // Forward move
  if (isValidPosition(row + direction, col) && !board[row + direction][col]) {
    moves.push({
      from: { row, col },
      to: { row: row + direction, col },
      piece,
    });

    // Double forward move from starting position
    if (row === startRow && !board[row + 2 * direction][col]) {
      moves.push({
        from: { row, col },
        to: { row: row + 2 * direction, col },
        piece,
      });
    }
  }

  // Diagonal captures
  for (const colOffset of [-1, 1]) {
    const newRow = row + direction;
    const newCol = col + colOffset;
    
    if (isValidPosition(newRow, newCol)) {
      const targetPiece = board[newRow][newCol];
      
      // Regular capture
      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push({
          from: { row, col },
          to: { row: newRow, col: newCol },
          piece,
          capturedPiece: targetPiece,
        });
      }
      
      // En passant
      if (gameState.enPassantTarget && 
          gameState.enPassantTarget.row === newRow && 
          gameState.enPassantTarget.col === newCol) {
        moves.push({
          from: { row, col },
          to: { row: newRow, col: newCol },
          piece,
          capturedPiece: board[row][newCol],
          isEnPassant: true,
        });
      }
    }
  }

  return moves;
};

const generateRookMoves = (board: Board, row: number, col: number, piece: ChessPiece): Move[] => {
  const moves: Move[] = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  for (const [rowDir, colDir] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;

      if (!isValidPosition(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      if (!targetPiece) {
        moves.push({
          from: { row, col },
          to: { row: newRow, col: newCol },
          piece,
        });
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({
            from: { row, col },
            to: { row: newRow, col: newCol },
            piece,
            capturedPiece: targetPiece,
          });
        }
        break;
      }
    }
  }

  return moves;
};

const generateBishopMoves = (board: Board, row: number, col: number, piece: ChessPiece): Move[] => {
  const moves: Move[] = [];
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

  for (const [rowDir, colDir] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;

      if (!isValidPosition(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      if (!targetPiece) {
        moves.push({
          from: { row, col },
          to: { row: newRow, col: newCol },
          piece,
        });
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({
            from: { row, col },
            to: { row: newRow, col: newCol },
            piece,
            capturedPiece: targetPiece,
          });
        }
        break;
      }
    }
  }

  return moves;
};

const generateQueenMoves = (board: Board, row: number, col: number, piece: ChessPiece): Move[] => {
  return [
    ...generateRookMoves(board, row, col, piece),
    ...generateBishopMoves(board, row, col, piece),
  ];
};

const generateKnightMoves = (board: Board, row: number, col: number, piece: ChessPiece): Move[] => {
  const moves: Move[] = [];
  const knightMoves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];

  for (const [rowOffset, colOffset] of knightMoves) {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;

    if (isValidPosition(newRow, newCol)) {
      const targetPiece = board[newRow][newCol];
      if (!targetPiece || targetPiece.color !== piece.color) {
        moves.push({
          from: { row, col },
          to: { row: newRow, col: newCol },
          piece,
          capturedPiece: targetPiece || undefined,
        });
      }
    }
  }

  return moves;
};

const generateKingMoves = (
  board: Board,
  row: number,
  col: number,
  piece: ChessPiece,
  gameState: GameState
): Move[] => {
  const moves: Move[] = [];
  const kingMoves = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  // Regular king moves
  for (const [rowOffset, colOffset] of kingMoves) {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;

    if (isValidPosition(newRow, newCol)) {
      const targetPiece = board[newRow][newCol];
      if (!targetPiece || targetPiece.color !== piece.color) {
        moves.push({
          from: { row, col },
          to: { row: newRow, col: newCol },
          piece,
          capturedPiece: targetPiece || undefined,
        });
      }
    }
  }

  // Castling moves
  if (!piece.hasMoved && !gameState.isCheck) {
    const castlingRow = piece.color === "white" ? 7 : 0;
    
    // Kingside castling
    if (gameState.canCastle[piece.color].kingside &&
        !board[castlingRow][5] && !board[castlingRow][6] &&
        !isSquareUnderAttack(board, castlingRow, 5, piece.color === "white" ? "black" : "white") &&
        !isSquareUnderAttack(board, castlingRow, 6, piece.color === "white" ? "black" : "white")) {
      moves.push({
        from: { row, col },
        to: { row: castlingRow, col: 6 },
        piece,
        isCastling: true,
      });
    }
    
    // Queenside castling
    if (gameState.canCastle[piece.color].queenside &&
        !board[castlingRow][1] && !board[castlingRow][2] && !board[castlingRow][3] &&
        !isSquareUnderAttack(board, castlingRow, 2, piece.color === "white" ? "black" : "white") &&
        !isSquareUnderAttack(board, castlingRow, 3, piece.color === "white" ? "black" : "white")) {
      moves.push({
        from: { row, col },
        to: { row: castlingRow, col: 2 },
        piece,
        isCastling: true,
      });
    }
  }

  return moves;
};

// Check if a move would result in check for the moving player
const wouldMoveResultInCheck = (board: Board, move: Move, color: PieceColor): boolean => {
  const newBoard = deepCopyBoard(board);
  
  // Apply the move
  newBoard[move.to.row][move.to.col] = move.piece;
  newBoard[move.from.row][move.from.col] = null;
  
  // Handle en passant
  if (move.isEnPassant) {
    newBoard[move.from.row][move.to.col] = null;
  }
  
  // Handle castling
  if (move.isCastling) {
    const castlingRow = move.from.row;
    if (move.to.col === 6) { // Kingside
      newBoard[castlingRow][5] = newBoard[castlingRow][7];
      newBoard[castlingRow][7] = null;
    } else { // Queenside
      newBoard[castlingRow][3] = newBoard[castlingRow][0];
      newBoard[castlingRow][0] = null;
    }
  }

  const kingPosition = findKing(newBoard, color);
  if (!kingPosition) return true; // No king found, definitely in check

  return isSquareUnderAttack(
    newBoard, 
    kingPosition.row, 
    kingPosition.col, 
    color === "white" ? "black" : "white"
  );
};

// Check if the current player is in check
export const isInCheck = (board: Board, color: PieceColor): boolean => {
  const kingPosition = findKing(board, color);
  if (!kingPosition) return false;

  return isSquareUnderAttack(
    board, 
    kingPosition.row, 
    kingPosition.col, 
    color === "white" ? "black" : "white"
  );
};

// Generate all legal moves for a color
export const getAllLegalMoves = (board: Board, color: PieceColor, gameState: GameState): Move[] => {
  const moves: Move[] = [];
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        moves.push(...generatePossibleMoves(board, row, col, gameState));
      }
    }
  }
  
  return moves;
};

// Check if it's checkmate or stalemate
export const checkGameEnd = (gameState: GameState): {
  isCheckmate: boolean;
  isStalemate: boolean;
  winner?: PieceColor | 'draw';
} => {
  const legalMoves = getAllLegalMoves(gameState.board, gameState.currentPlayer, gameState);
  const inCheck = isInCheck(gameState.board, gameState.currentPlayer);
  
  if (legalMoves.length === 0) {
    if (inCheck) {
      return {
        isCheckmate: true,
        isStalemate: false,
        winner: gameState.currentPlayer === "white" ? "black" : "white",
      };
    } else {
      return {
        isCheckmate: false,
        isStalemate: true,
        winner: 'draw',
      };
    }
  }
  
  return {
    isCheckmate: false,
    isStalemate: false,
  };
};

// Apply a move to the game state
export const applyMove = (gameState: GameState, move: Move): GameState => {
  const newBoard = deepCopyBoard(gameState.board);
  const newGameState: GameState = {
    ...gameState,
    board: newBoard,
    currentPlayer: gameState.currentPlayer === "white" ? "black" : "white",
    moves: [...gameState.moves, move],
    enPassantTarget: undefined,
  };

  // Apply the move
  newBoard[move.to.row][move.to.col] = { ...move.piece, hasMoved: true };
  newBoard[move.from.row][move.from.col] = null;

  // Handle special moves
  if (move.isEnPassant) {
    newBoard[move.from.row][move.to.col] = null;
  }

  if (move.isCastling) {
    const castlingRow = move.from.row;
    if (move.to.col === 6) { // Kingside
      newBoard[castlingRow][5] = { ...newBoard[castlingRow][7]!, hasMoved: true };
      newBoard[castlingRow][7] = null;
    } else { // Queenside
      newBoard[castlingRow][3] = { ...newBoard[castlingRow][0]!, hasMoved: true };
      newBoard[castlingRow][0] = null;
    }
  }

  // Handle pawn double move (en passant setup)
  if (move.piece.type === "pawn" && Math.abs(move.to.row - move.from.row) === 2) {
    newGameState.enPassantTarget = {
      row: (move.from.row + move.to.row) / 2,
      col: move.to.col,
    };
  }

  // Update castling rights
  if (move.piece.type === "king") {
    newGameState.canCastle[move.piece.color].kingside = false;
    newGameState.canCastle[move.piece.color].queenside = false;
  }

  if (move.piece.type === "rook") {
    if (move.from.col === 0) {
      newGameState.canCastle[move.piece.color].queenside = false;
    } else if (move.from.col === 7) {
      newGameState.canCastle[move.piece.color].kingside = false;
    }
  }

  // Check for check, checkmate, and stalemate
  newGameState.isCheck = isInCheck(newBoard, newGameState.currentPlayer);
  const gameEnd = checkGameEnd(newGameState);
  newGameState.isCheckmate = gameEnd.isCheckmate;
  newGameState.isStalemate = gameEnd.isStalemate;
  newGameState.winner = gameEnd.winner;

  return newGameState;
};

// Validate if a move is legal
export const isValidMove = (
  gameState: GameState,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean => {
  const piece = gameState.board[fromRow][fromCol];
  if (!piece || piece.color !== gameState.currentPlayer) {
    return false;
  }

  const possibleMoves = generatePossibleMoves(gameState.board, fromRow, fromCol, gameState);
  return possibleMoves.some(move => 
    move.to.row === toRow && move.to.col === toCol
  );
};
