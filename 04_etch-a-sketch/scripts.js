const container = document.querySelector('.container');

const btn = document.querySelector('button');

btn.addEventListener('click', e => {
  let user = prompt('Enter your prefared width');
  if (user > 100) {
    user = prompt('Maximum width is 100');
  }
  buildGrid(user);
});

function buildGrid(amount) {
  container.replaceChildren();
  const size = 960 / amount;
  const total = amount * amount;
  const fragment = document.createDocumentFragment();

  for (let count = 0; count < total; count++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.height = `${size}px`;
    pixel.style.width = `${size}px`;
    fragment.appendChild(pixel);
  }

  container.appendChild(fragment);
  let pixels = document.querySelectorAll('.pixel');

  pixels.forEach(e => e.addEventListener('mouseover', paint));
}

buildGrid(16);

function paint(event) {
  const pixel = event.target;

  if (!pixel.dataset.hue) {
    const hue = Math.floor(Math.random() * 360);
    const light = 90;

    pixel.dataset.hue = hue;
    pixel.dataset.lightness = light;

    pixel.style.backgroundColor = `hsl(${hue}, 100%, ${light}%)`;
    pixel.classList.add('painted');
  } else {
    const hue = pixel.dataset.hue;
    const currentLightness = Number(pixel.dataset.lightness);
    const newLightness = Math.max(50, currentLightness - 5);
    pixel.dataset.lightness = newLightness;
    pixel.style.backgroundColor = `hsl(${hue}, 100%, ${newLightness}%)`;
    console.log(newLightness);
  }
}
