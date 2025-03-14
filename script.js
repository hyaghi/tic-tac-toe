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

        const move = bestMove(gameBoard);
        if (move) {
            gameBoard[move.i] = currentPlayer;
            cells[move.i].textContent = currentPlayer;
            cells[move.i].classList.add(currentPlayer);
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

    function minimax(board, depth, isMaximizing) { 
        const scores = { 
            X: -1, 
            O: 1, 
            draw: 0 
        }; 
        let result = checkWin(); // Use checkWin function 
        if (result !== null) { 
            return scores[result]; 
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                for (let i = 0; i < board.length; i++) { 
                    if (board[i] === '') { 
                        board[i] = isMaximizing ? 'O' : 'X'; // Use the correct player 
                        let score = minimax(board, depth + 1, !isMaximizing); 
                        board[i] = ''; // Undo move

                         bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = 'X'; // Player
                        let score = minimax(board, depth + 1, true);
                        board[i][j] = ''; // Undo move
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    function bestMove(board) {
        console.log("Calculating best move...");
        let move;
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O'; // AI
                let score = minimax(board, 0, false);
                board[i] = ''; // Undo move
                console.log(`Score for move ${i}: ${score}`);
                if (score > bestScore) {
                    bestScore = score;
                    move = { i };
                }
            }
        }
        console.log(`Best move chosen: ${move}`);
        return move;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);

    status.textContent = `Player ${currentPlayer}'s turn`;

