function generateImage() {
  const text = document.getElementById('inputText').value.toLowerCase();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Reset
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 0;
  canvas.height = 0;

  let loaded = 0;
  let totalWidth = 0;
  let maxHeight = 0;
  const images = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const img = new Image();
    img.src = `font/${ch}.png`;

    img.onload = () => {
      images[i] = img;
      totalWidth += img.width;
      if (img.height > maxHeight) maxHeight = img.height;
      loaded++;

      if (loaded === text.length) {
        // All images loaded, now draw
        canvas.width = totalWidth;
        canvas.height = maxHeight;

        let x = 0;
        for (let j = 0; j < images.length; j++) {
          const im = images[j];
          ctx.drawImage(im, x, 0);
          x += im.width;
        }

        // Enable download
        const link = document.getElementById('downloadLink');
        link.href = canvas.toDataURL("image/png");
        link.style.display = 'inline';
      }
    };

    img.onerror = () => {
      console.warn(`❌ Missing image for '${ch}'`);
      loaded++;
    };
  }
}
