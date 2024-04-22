const board = document.getElementById('board');
  const cells = [];
  let currentPlayer = 'X';
  
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleCellClick(i));
    cells.push(cell);
    board.appendChild(cell);
  }
  
  function handleCellClick(index) {
    if (!cells[index].textContent) {
      cells[index].textContent = currentPlayer;
      if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        resetGame();
        return;
      }
      if (checkDraw()) {
        alert("It's a draw!");
        resetGame();
        return;
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
  
  function checkWinner() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    return winningCombos.some(combo => {
      return combo.every(index => cells[index].textContent === currentPlayer);
    });
  }
  
  function checkDraw() {
    return cells.every(cell => cell.textContent);
  }
  
  function resetGame() {
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
  }