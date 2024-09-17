let CELLS   = [];
let MARKED = 10;
let board     = document.getElementById('board' );
let markedDiv = document.getElementById('marked');
markedDiv.innerText = MARKED;
createBoard();
// ---------------------------------------------------------------------------------------------------------------------->
function createBoard() {
  for (let row = 0; row < 10; row++) {
    CELLS[row] = [];
    for (let col = 0; col < 10; col++) {      
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `${row}-${col}`;
      cell.dataset.isMine = "0";
      cell.addEventListener('click', (e) => {
        cellClick(cell);
      });
      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        markCell(cell);     
      });

      CELLS[row][col] = cell;      
      board.appendChild(cell);
    }
  }
  addMine();
  markNumberCells();
}
// ---------------------------------------------------------------------------------------------------------------------->
function addMine() {  
  let mines = 10;
  while(mines > 0) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let cell = CELLS[row][col];
    if (cell.dataset.isMine == "0") {
      cell.dataset.isMine = "1";
      cell.style.backgroundColor = 'red '; // HIDE
      mines--;    
    }     
  }  
};
// ---------------------------------------------------------------------------------------------------------------------->
function markCell(cell) {
  if (cell.dataset.isMarked == "1") {
    // cell.style.backgroundColor = cell.dataset.isMine == "1" ? 'red' : '';
    cell.style.backgroundColor = '';
    cell.dataset.isMarked = "0";
    MARKED++;
  } else {
    cell.style.backgroundColor = 'yellow';
    cell.dataset.isMarked = "1";
    MARKED--;
  }      
  markedDiv.innerText = MARKED;
}
// ---------------------------------------------------------------------------------------------------------------------->
function cellClick(cell) {
  if (cell.dataset.isMarked == "1") return;

  if (cell.dataset.isMine == "1") {
    cell.style.backgroundColor = 'red';
    alert('Game Over');
    CELLS = [];
    board.innerHTML = '';
    return;
  }

  if (cell.dataset.mineCount !== '0') {
    cell.innerText             = cell.dataset.mineCount;
    cell.style.backgroundColor = 'lightgreen';
  } else {
    markEmptyCells();
  }  
};
// ---------------------------------------------------------------------------------------------------------------------->
function isValidCell(i, j) {
  return i >= 0 && i < CELLS.length && j >= 0 && j < CELLS[i].length;
}
// ---------------------------------------------------------------------------------------------------------------------->
function markEmptyCells() {
  for (let i = 0; i< CELLS.length; i++) {
    for (let j = 0; j < CELLS.length; j++) {
      let cur_cell = CELLS[i][j];
      if (cur_cell.dataset.mineCount === '0') {
        cur_cell.style.backgroundColor = "white";        
        cur_cell.style.border = "1px inset #ccc";
        
      }
    }
  }
}
// ---------------------------------------------------------------------------------------------------------------------->
function markNumberCells() {
  for (let i = 0; i< CELLS.length; i++) {
    for (let j = 0; j < CELLS.length; j++) {
      let mineCount = 0;

      let is_mine_cell_TOP          = isValidCell(i+1, j  ) ? CELLS[i+1][j  ].dataset.isMine == '1' : undefined;
      let is_mine_cell_TOP_LEFT     = isValidCell(i+1, j-1) ? CELLS[i+1][j-1].dataset.isMine == '1' : undefined;
      let is_mine_cell_TOP_RIGHT    = isValidCell(i+1, j+1) ? CELLS[i+1][j+1].dataset.isMine == '1' : undefined;
      let is_mine_cell_RIGHT        = isValidCell(i  , j+1) ? CELLS[i  ][j+1].dataset.isMine == '1' : undefined;
      let is_mine_cell_LEFT         = isValidCell(i  , j-1) ? CELLS[i  ][j-1].dataset.isMine == '1' : undefined;
      let is_mine_cell_BOTTOM       = isValidCell(i-1, j  ) ? CELLS[i-1][j  ].dataset.isMine == '1' : undefined;
      let is_mine_cell_BOTTOM_LEFT  = isValidCell(i-1, j-1) ? CELLS[i-1][j-1].dataset.isMine == '1' : undefined;
      let is_mine_cell_BOTTOM_RIGHT = isValidCell(i-1, j+1) ? CELLS[i-1][j+1].dataset.isMine == '1' : undefined;

      if (is_mine_cell_TOP         ) mineCount++;
      if (is_mine_cell_TOP_LEFT    ) mineCount++;
      if (is_mine_cell_TOP_RIGHT   ) mineCount++;
      if (is_mine_cell_RIGHT       ) mineCount++;
      if (is_mine_cell_LEFT        ) mineCount++;
      if (is_mine_cell_BOTTOM      ) mineCount++;
      if (is_mine_cell_BOTTOM_LEFT ) mineCount++;
      if (is_mine_cell_BOTTOM_RIGHT) mineCount++;

      let cur_cell = CELLS[i][j];
      cur_cell.dataset.mineCount = mineCount > 0 ? mineCount : '0';
    }
  }
};
// ---------------------------------------------------------------------------------------------------------------------->