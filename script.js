const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const catGif = document.getElementById('win-gif');
const cells = document.querySelectorAll('.cell');

// Новые переменные для имен
const p1Input = document.getElementById('player1');
const p2Input = document.getElementById('player2');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Функция для получения имени текущего игрока
function getCurrentPlayerName() {
  if (currentPlayer === 'X') {
    return p1Input.value.trim() || 'Игрок 1'; // Если поле пустое, будет "Игрок 1"
  } else {
    return p2Input.value.trim() || 'Игрок 2';
  }
}

function handleClick(e) {
  const cell = e.target;
  if (!cell.classList.contains('cell')) return;

  const index = Number(cell.dataset.index);
  if (gameOver || board[index] !== '') return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

if (checkWin()) {
  statusEl.textContent = `Победил ${getCurrentPlayerName()}!`;
  catGif.style.display = 'block'; // Показываем котика
  gameOver = true;
  return;
}

  if (board.every(cell => cell !== '')) {
    statusEl.textContent = 'Ничья!';
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusEl.textContent = `Ход: ${getCurrentPlayerName()}`;
}

function checkWin() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      combo.forEach(i => cells[i].classList.add('win'));
      return true;
    }
  }
  return false;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  catGif.style.display = 'none'; // <--- ВОТ ЭТА НОВАЯ СТРОЧКА ПРЯЧЕТ КОТИКА
  statusEl.textContent = `Ход: ${getCurrentPlayerName()}`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'win');
  });
}


boardEl.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetGame);

// Если игрок меняет имя в поле ввода, сразу обновляем статус
p1Input.addEventListener('input', () => {
  if (currentPlayer === 'X' && !gameOver) statusEl.textContent = `Ход: ${getCurrentPlayerName()}`;
});

p2Input.addEventListener('input', () => {
  if (currentPlayer === 'O' && !gameOver) statusEl.textContent = `Ход: ${getCurrentPlayerName()}`;
});