document.addEventListener('DOMContentLoaded', function () {
  const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const resetBtn = document.getElementById('reset');
  const cells = document.querySelectorAll('.cell');

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameOver = false;

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleClick(e) {
    const cell = e.target;

    // Клик мог прийти по доске, а не по клетке
    if (!cell.classList.contains('cell')) return;

    const index = Number(cell.dataset.index);

    if (gameOver || board[index] !== '') return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
      statusEl.textContent = 'Победил ' + currentPlayer + '!';
      gameOver = true;
      return;
    }

    if (board.every(function (c) { return c !== ''; })) {
      statusEl.textContent = 'Ничья!';
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusEl.textContent = 'Ход: ' + currentPlayer;
  }

  function checkWin() {
    for (let i = 0; i < winCombos.length; i++) {
      const combo = winCombos[i];
      const a = combo[0];
      const b = combo[1];
      const c = combo[2];

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        combo.forEach(function (idx) {
          cells[idx].classList.add('win');
        });
        return true;
      }
    }
    return false;
  }

  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    statusEl.textContent = 'Ход: X';

    cells.forEach(function (cell) {
      cell.textContent = '';
      cell.classList.remove('x', 'o', 'win');
    });
  }

  boardEl.addEventListener('click', handleClick);
  resetBtn.addEventListener('click', resetGame);
});
