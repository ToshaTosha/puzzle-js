var image = new Image();
image.src = "./image.png";
let colsCounter = 9;
let rowsCounter = 6;
let tileWidth = 50;
let tileHeight = 50;
let imagePieces = [];

// картинка разбивается на кусочки
function cutImageUp() {
  for (var x = 0; x < colsCounter; x++) {
    for (var y = 0; y < rowsCounter; y++) {
      var canvas = document.createElement("canvas");
      canvas.width = tileWidth;
      canvas.height = tileHeight;
      var context = canvas.getContext("2d");
      context.drawImage(
        image,
        x * tileWidth,
        y * tileHeight,
        tileWidth,
        tileHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
      imagePieces.push(canvas.toDataURL("image/png"));
    }
  }

  for (let i = 0; i < imagePieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = imagePieces[i];

    tile.addEventListener("dragstart", dragStart);
    tile.addEventListener("dragover", dragOver);
    tile.addEventListener("dragenter", dragEnter);
    tile.addEventListener("dragleave", dragLeave);
    tile.addEventListener("drop", dragDrop);
    tile.addEventListener("dragend", dragEnd);

    document.getElementById("pieces").append(tile);
  }
}

function startGame() {
  cutImageUp();
  for (let r = 0; r < rowsCounter; r++) {
    for (let c = 0; c < colsCounter; c++) {
      // изначально поле заполнено прозрачными квадратами, при перетаскивании кусочка картинки на поле он (кусочек) будет меняться местами с квадратом фона
      let tile = document.createElement("img");
      tile.src = "back0.png";

      // перетаскивание кусочка изображения
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
    }
  }
}

// перетаскивание
function dragStart() {
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (currTile.src.includes("blank0")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;
}

startGame();
