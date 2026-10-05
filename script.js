const command = document.querySelector('#install-command');
const copyButton = document.querySelector('#copy-command');
const copyStatus = document.querySelector('#copy-status');
const video = document.querySelector('video');
const motionButton = document.querySelector('#toggle-video');
const motionLabel = document.querySelector('#motion-label');
let copyTimer;

// Match Forskapong's StaticNoise overlay over the liquid-flow background.
const grain = document.querySelector('.grain');
const noiseCanvas = document.createElement('canvas');
noiseCanvas.width = noiseCanvas.height = 450;
const noiseContext = noiseCanvas.getContext('2d');
if (noiseContext) {
  const noise = noiseContext.createImageData(450, 450);
  for (let i = 0; i < noise.data.length; i += 4) {
    if (Math.random() <= 0.5) {
      noise.data[i] = noise.data[i + 1] = noise.data[i + 2] = 255;
      noise.data[i + 3] = 128;
    }
  }
  noiseContext.putImageData(noise, 0, 0);
  grain.style.backgroundImage = `url(${noiseCanvas.toDataURL()})`;
}

copyButton.addEventListener('click', async () => {
  const text = command.textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    copyButton.classList.add('copied');
    copyButton.setAttribute('aria-label', 'Installation command copied');
    copyStatus.textContent = 'Copied to clipboard';
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copyButton.classList.remove('copied');
      copyButton.setAttribute('aria-label', 'Copy installation command');
      copyStatus.textContent = '';
    }, 2400);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(command);
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = 'Press ⌘C or Ctrl+C to copy the selected command';
  }
});

function updateMotionControl() {
  const paused = video.paused;
  motionButton.classList.toggle('paused', paused);
  motionButton.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
  motionButton.title = paused ? 'Play background video' : 'Pause background video';
  motionLabel.textContent = paused ? 'Play video' : 'Pause video';
}
video.addEventListener('play', updateMotionControl);
video.addEventListener('pause', updateMotionControl);
motionButton.addEventListener('click', async () => {
  if (video.paused) {
    try { await video.play(); } catch { updateMotionControl(); }
  } else {
    video.pause();
  }
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMotion.matches) video.pause();
else video.play().catch(updateMotionControl);
reducedMotion.addEventListener('change', event => { if (event.matches) video.pause(); });
updateMotionControl();
