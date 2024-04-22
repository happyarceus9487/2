const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector('.restart-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWinner = () => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      return gameBoard[a];
    }
  }
  return null;
};

const handleCellClick = (e) => {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-cell'));

  if (gameBoard[index] !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  gameBoard[index] = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    alert(`Player ${winner} wins!`);
    gameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== '')) {
    alert('It\'s a draw!');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const restartGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
  });
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
