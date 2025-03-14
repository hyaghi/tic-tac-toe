const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const resetBtn = document.querySelector('.reset');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

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

    function checkWin() {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
      return null;
    }

    function checkDraw() {
      return !gameBoard.includes('');
    }

    function handleCellClick(e) {
      const index = e.target.dataset.index;

      if (gameBoard[index] !== '' || !gameActive || currentPlayer !== 'X') {
        return;
      }

      gameBoard[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      e.target.classList.add(currentPlayer);
      checkGameStatus();
      if (gameActive) {
        switchPlayer();
        computerMove();
      }
    }

    function computerMove() {
      if (!gameActive || currentPlayer !== 'O') return;

      let emptyCells = [];
      for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
          emptyCells.push(i);
        }
      }

      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerIndex = emptyCells[randomIndex];
        gameBoard[computerIndex] = currentPlayer;
        cells[computerIndex].textContent = currentPlayer;
        cells[computerIndex].classList.add(currentPlayer);
        checkGameStatus();
        if (gameActive) {
          switchPlayer();
        }
      }
    }

    function switchPlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkGameStatus() {
      const winner = checkWin();
      if (winner) {
        status.textContent = `Player ${winner} wins!`;
        gameActive = false;
      } else if (checkDraw()) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
      }
    }

    function resetGame() {
      currentPlayer = 'X';
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      status.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
      });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);

    status.textContent = `Player ${currentPlayer}'s turn`;
