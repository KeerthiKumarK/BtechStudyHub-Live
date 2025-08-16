import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Gamepad2, 
  Crown, 
  Play, 
  RotateCcw, 
  Trophy, 
  Users, 
  Clock, 
  Star,
  Brain,
  Target,
  Zap,
  RefreshCw,
  Home,
  Settings
} from 'lucide-react';

// Chess piece types
type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type PieceColor = 'white' | 'black';
type Square = {
  piece: PieceType | null;
  color: PieceColor | null;
} | null;

// Chess piece Unicode symbols
const pieceSymbols = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙'
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  }
};

// Initial chess board setup
const initialBoard: Square[][] = [
  [
    { piece: 'rook', color: 'black' }, { piece: 'knight', color: 'black' }, { piece: 'bishop', color: 'black' }, { piece: 'queen', color: 'black' },
    { piece: 'king', color: 'black' }, { piece: 'bishop', color: 'black' }, { piece: 'knight', color: 'black' }, { piece: 'rook', color: 'black' }
  ],
  Array(8).fill(null).map(() => ({ piece: 'pawn', color: 'black' })),
  Array(8).fill(null).map(() => null),
  Array(8).fill(null).map(() => null),
  Array(8).fill(null).map(() => null),
  Array(8).fill(null).map(() => null),
  Array(8).fill(null).map(() => ({ piece: 'pawn', color: 'white' })),
  [
    { piece: 'rook', color: 'white' }, { piece: 'knight', color: 'white' }, { piece: 'bishop', color: 'white' }, { piece: 'queen', color: 'white' },
    { piece: 'king', color: 'white' }, { piece: 'bishop', color: 'white' }, { piece: 'knight', color: 'white' }, { piece: 'rook', color: 'white' }
  ]
];

interface Game {
  id: string;
  name: string;
  description: string;
  category: 'Strategy' | 'Puzzle' | 'Classic' | 'Quick';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  players: string;
  thumbnail: string;
  featured: boolean;
}

const availableGames: Game[] = [
  {
    id: 'chess',
    name: 'Chess',
    description: 'Classic strategy game that enhances logical thinking and planning skills',
    category: 'Strategy',
    difficulty: 'Medium',
    players: '1-2 Players',
    thumbnail: '♔',
    featured: true
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    description: 'Number puzzle game that improves concentration and logical reasoning',
    category: 'Puzzle',
    difficulty: 'Medium',
    players: '1 Player',
    thumbnail: '🔢',
    featured: false
  },
  {
    id: 'memory',
    name: 'Memory Game',
    description: 'Card matching game to enhance memory and concentration',
    category: 'Classic',
    difficulty: 'Easy',
    players: '1 Player',
    thumbnail: '🧠',
    featured: false
  },
  {
    id: 'snake',
    name: 'Snake Game',
    description: 'Classic arcade game for quick relaxation breaks',
    category: 'Quick',
    difficulty: 'Easy',
    players: '1 Player',
    thumbnail: '🐍',
    featured: false
  }
];

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [board, setBoard] = useState<Square[][]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 15,
    wins: 8,
    draws: 3,
    currentStreak: 2
  });

  const resetChessBoard = () => {
    setBoard(initialBoard.map(row => row.map(square => square ? { ...square } : null)));
    setCurrentPlayer('white');
    setSelectedSquare(null);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      if (selectedRow === row && selectedCol === col) {
        // Deselect if clicking the same square
        setSelectedSquare(null);
        return;
      }

      // Simple move logic (basic implementation)
      const piece = board[selectedRow][selectedCol];
      if (piece && piece.color === currentPlayer) {
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = piece;
        newBoard[selectedRow][selectedCol] = null;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      }
      setSelectedSquare(null);
    } else {
      // Select square if it has a piece of the current player
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
      }
    }
  };

  const getDifficultyColor = (difficulty: Game['difficulty']) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: Game['category']) => {
    switch (category) {
      case 'Strategy': return <Crown className="w-4 h-4" />;
      case 'Puzzle': return <Brain className="w-4 h-4" />;
      case 'Classic': return <Star className="w-4 h-4" />;
      case 'Quick': return <Zap className="w-4 h-4" />;
      default: return <Gamepad2 className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Interactive Games
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Take a break and relax with brain-stimulating games designed to enhance your cognitive skills while having fun.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">{gameStats.gamesPlayed}</div>
                  <div className="text-sm text-purple-100">Games Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{gameStats.wins}</div>
                  <div className="text-sm text-purple-100">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{gameStats.draws}</div>
                  <div className="text-sm text-purple-100">Draws</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{gameStats.currentStreak}</div>
                  <div className="text-sm text-purple-100">Win Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {selectedGame === 'chess' ? (
            /* Chess Game Interface */
            <div className="max-w-4xl mx-auto">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">♔</div>
                      <div>
                        <CardTitle className="text-2xl">Chess Game</CardTitle>
                        <p className="text-muted-foreground">
                          Current Player: <Badge variant={currentPlayer === 'white' ? 'default' : 'secondary'}>
                            {currentPlayer === 'white' ? 'White' : 'Black'}
                          </Badge>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={resetChessBoard}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset Game
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedGame(null)}>
                        <Home className="w-4 h-4 mr-2" />
                        Back to Games
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center overflow-x-auto">
                    <div className="grid grid-cols-8 gap-0 border-2 border-gray-400 bg-white min-w-fit">
                      {board.map((row, rowIndex) =>
                        row.map((square, colIndex) => {
                          const isLight = (rowIndex + colIndex) % 2 === 0;
                          const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex;

                          return (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className={`
                                w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center cursor-pointer text-lg sm:text-2xl md:text-4xl transition-colors
                                ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                                ${isSelected ? 'ring-2 sm:ring-4 ring-blue-500' : ''}
                                hover:opacity-80
                              `}
                              onClick={() => handleSquareClick(rowIndex, colIndex)}
                            >
                              {square && square.piece && square.color && (
                                <span className="select-none">
                                  {pieceSymbols[square.color][square.piece]}
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      Click on a piece to select it, then click on a destination square to move.
                    </p>
                    <div className="flex justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-amber-100 border"></div>
                        <span>Light Squares</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-amber-800 border"></div>
                        <span>Dark Squares</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Games Selection Interface */
            <>
              {/* Featured Game */}
              <Card className="mb-8 border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <CardTitle>Featured Game</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-4xl">♔</div>
                        <div>
                          <h3 className="text-2xl font-bold">Chess</h3>
                          <p className="text-muted-foreground">Master the game of kings</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Challenge yourself with the classic strategy game that has captivated minds for centuries. 
                        Perfect for developing strategic thinking and planning skills.
                      </p>
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge className={getDifficultyColor('Medium')}>Medium</Badge>
                        <Badge variant="outline">Strategy</Badge>
                        <span className="text-sm text-muted-foreground">1-2 Players</span>
                      </div>
                      <Button 
                        onClick={() => setSelectedGame('chess')}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Play Chess
                      </Button>
                    </div>
                    <div className="text-center">
                      <div className="text-8xl md:text-9xl">♔</div>
                      <p className="text-sm text-muted-foreground mt-2">Click to start playing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* All Games Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {availableGames.map((game) => (
                  <Card key={game.id} className={`group hover:shadow-lg transition-all duration-300 ${game.featured ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{game.thumbnail}</div>
                          <div>
                            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                              {game.name}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="flex items-center space-x-1">
                                {getCategoryIcon(game.category)}
                                <span>{game.category}</span>
                              </Badge>
                              {game.featured && (
                                <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">{game.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{game.players}</span>
                      </div>

                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => game.id === 'chess' ? setSelectedGame('chess') : null}
                        disabled={game.id !== 'chess'}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {game.id === 'chess' ? 'Play Now' : 'Coming Soon'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Benefits Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-6 h-6 text-primary" />
                    <span>Benefits of Playing Games</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Brain className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">Cognitive Enhancement</h4>
                      <p className="text-sm text-muted-foreground">
                        Improve memory, concentration, and problem-solving abilities.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">Strategic Thinking</h4>
                      <p className="text-sm text-muted-foreground">
                        Develop planning skills and learn to think several steps ahead.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <RefreshCw className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">Stress Relief</h4>
                      <p className="text-sm text-muted-foreground">
                        Take productive breaks and refresh your mind between study sessions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
