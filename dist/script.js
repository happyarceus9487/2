const squares = document.querySelectorAll('.square');
        const message = document.querySelector('.message');

        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];

        const checkWinner = function() {
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
                    message.textContent = `玩家 ${currentPlayer} 獲勝！`;
                    return true;
                }
            }

            if (gameBoard.every(square => square !== '')) {
                message.textContent = '平局！';
                return true;
            }

            return false;
        };

        const handleClick = function(event) {
            const square = event.target;
            const squareIndex = parseInt(square.dataset.square);

            if (square.textContent === '') {
                square.textContent = currentPlayer;
                gameBoard[squareIndex] = currentPlayer;

                if (checkWinner()) {
                    squares.forEach(square => square.removeEventListener('click', handleClick));
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    message.textContent = `玩家 ${currentPlayer} 的回合`;
                }
            }
        };

        squares.forEach(square => square.addEventListener('click', handleClick));