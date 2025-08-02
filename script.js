const charWidth = 64; // adjust to your font size
const charHeight = 64;

function generateImage() {
  const text = document.getElementById('inputText').value.toLowerCase();
  const canvas = document.getElementById('canvas');
  canvas.width = charWidth * text.length;
  canvas.height = charHeight;
  const ctx = canvas.getContext('2d');

  let loaded = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const img = new Image();
    img.src = `font/${ch}.png`;
    img.onload = () => {
      ctx.drawImage(img, i * charWidth, 0, charWidth, charHeight);
      loaded++;
      if (loaded === text.length) {
        const link = document.getElementById('downloadLink');
        link.href = canvas.toDataURL();
        link.style.display = 'inline';
      }
    };
    img.onerror = () => {
      console.warn(`No image for: ${ch}`);
      loaded++;
    };
  }
}
