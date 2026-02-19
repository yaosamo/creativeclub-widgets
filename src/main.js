const knob = document.querySelector('.target-knob');
const xVal = document.querySelector('#xVal');
const yVal = document.querySelector('#yVal');
const zVal = document.querySelector('#zVal');
const wVal = document.querySelector('#wVal');

if (knob && xVal && yVal && zVal && wVal) {
  let dragging = false;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const toPct = (n) => (Math.round(n * 10) / 10).toFixed(1);

  const update = (clientX, clientY) => {
    const box = knob.parentElement.getBoundingClientRect();
    const x = clamp((clientX - box.left) / box.width, 0.15, 0.86);
    const y = clamp((clientY - box.top) / box.height, 0.14, 0.84);

    knob.style.left = `${x * 100}%`;
    knob.style.top = `${y * 100}%`;

    xVal.textContent = toPct(55 + x * 42);
    yVal.textContent = toPct(45 + (1 - y) * 40);
    zVal.textContent = toPct(52 + (x * 0.5 + (1 - y) * 0.5) * 34);
    wVal.textContent = toPct(58 + (x * 0.35 + y * 0.45) * 26);
  };

  const start = (e) => {
    dragging = true;
    knob.style.cursor = 'grabbing';
    if (e.touches?.[0]) update(e.touches[0].clientX, e.touches[0].clientY);
    else update(e.clientX, e.clientY);
  };

  const move = (e) => {
    if (!dragging) return;
    if (e.touches?.[0]) update(e.touches[0].clientX, e.touches[0].clientY);
    else update(e.clientX, e.clientY);
  };

  const end = () => {
    dragging = false;
    knob.style.cursor = 'grab';
  };

  knob.addEventListener('pointerdown', start);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', end);
  knob.addEventListener('touchstart', start, { passive: true });
  window.addEventListener('touchmove', move, { passive: true });
  window.addEventListener('touchend', end, { passive: true });
}
