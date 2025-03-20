const templateSelect = document.getElementById("template");
const fileInput = document.getElementById("upload");
const topTextInput = document.getElementById("top-text");
const bottomTextInput = document.getElementById("bottom-text");
const generateBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download");
const memeCanvas = document.getElementById("meme-canvas");
const ctx = memeCanvas.getContext("2d");

const memeTemplates = {
  drake: "templates/drake.jpg",
  distracted: "templates/distracted.jpg",
  spongebob: "templates/spongebob.jpg",
  success: "templates/success.jpg",
};

let currentImage = new Image();
currentImage.crossOrigin = "anonymous";
currentImage.onerror = () => {
  alert("Image failed to load. Please try a different one.");
};

function loadDefaultTemplate() {
  currentImage.src = memeTemplates["drake"];
  currentImage.onload = () => drawMeme();
}

function drawMeme() {
  memeCanvas.width = currentImage.width;
  memeCanvas.height = currentImage.height;

  ctx.drawImage(currentImage, 0, 0, memeCanvas.width, memeCanvas.height);

  ctx.font = "40px Impact";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.textAlign = "center";

  ctx.fillText(topTextInput.value.toUpperCase(), memeCanvas.width / 2, 50);
  ctx.strokeText(topTextInput.value.toUpperCase(), memeCanvas.width / 2, 50);

  ctx.fillText(
    bottomTextInput.value.toUpperCase(),
    memeCanvas.width / 2,
    memeCanvas.height - 20
  );
  ctx.strokeText(
    bottomTextInput.value.toUpperCase(),
    memeCanvas.width / 2,
    memeCanvas.height - 20
  );
}

templateSelect.addEventListener("change", (event) => {
  const selectedTemplate = event.target.value;
  if (selectedTemplate === "upload") {
    fileInput.click();
  } else {
    currentImage.src = memeTemplates[selectedTemplate];
    currentImage.onload = () => drawMeme();
  }
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      currentImage.src = e.target.result;
      currentImage.onload = () => drawMeme();
    };
    reader.readAsDataURL(file);
  }
});

topTextInput.addEventListener("input", drawMeme);
bottomTextInput.addEventListener("input", drawMeme);

generateBtn.addEventListener("click", drawMeme);

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = memeCanvas.toDataURL("image/png");
  link.download = "meme.png";
  link.click();
});

loadDefaultTemplate();
