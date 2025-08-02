const charWidth = 64;  // must match your actual PNG width
const charHeight = 64;

function generateImage() {
  const text = document.getElementById('inputText').value.toLowerCase();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = charWidth * text.length;
  canvas.height = charHeight;

  let loaded = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const img = new Image();
    img.crossOrigin = "Anonymous"; // just in case
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
      console.warn(`Missing image for: ${ch}`);
      loaded++;
    };
  }
}
