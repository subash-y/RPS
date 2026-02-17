import { animate, createTimeline, createTimer, stagger, utils } from 'https://esm.sh/animejs';

const creatureEl = document.querySelector('#creature');
const viewport = { w: window.innerWidth * 0.5, h: window.innerHeight * 0.5 };
const cursor = { x: 0, y: 0 };
const rows = 13;
const grid = [rows, rows];
const from = 'center';
const scaleStagger = stagger([2, 5], { ease: 'inQuad', grid, from });
const opacityStagger = stagger([1, 0.1], { grid, from });

// Create grid particles
for (let i = 0; i < rows * rows; i++) {
  creatureEl.appendChild(document.createElement('div'));
}

const particuleEls = creatureEl.querySelectorAll('div');

// Initial styling
utils.set(creatureEl, {
  width: `${rows * 10}em`,
  height: `${rows * 10}em`
});

utils.set(particuleEls, {
  x: 0,
  y: 0,
  scale: scaleStagger,
  opacity: opacityStagger,
  background: stagger([80, 20], {
    grid, from,
    modifier: v => `hsl(4, 70%, ${v}%)`,
  }),
  boxShadow: stagger([8, 1], {
    grid, from,
    modifier: v => `0px 0px ${utils.round(v, 0)}em 0px var(--red)`,
  }),
  zIndex: stagger([rows * rows, 1], { grid, from, modifier: utils.round(0) }),
});

// Pulse animation (unchanged)
const pulse = () => {
  animate(particuleEls, {
    keyframes: [
      {
        scale: 5,
        opacity: 1,
        delay: stagger(90, { start: 1650, grid, from }),
        duration: 150,
      },
      {
        scale: scaleStagger,
        opacity: opacityStagger,
        ease: 'inOutQuad',
        duration: 600,
      }
    ]
  });
};

// Main loop, only runs once per move
const mainLoop = createTimer({
  frameRate: 15,
  onUpdate: () => {
    animate(particuleEls, {
      x: cursor.x,
      y: cursor.y,
      delay: stagger(40, { grid, from }),
      duration: stagger(120, { start: 750, ease: 'inQuad', grid, from }),
      ease: 'inOut',
      composition: 'blend',
      complete: () => {
        mainLoop.pause(); // Pause after one animation cycle
      }
    });
  }
});

// Handle pointer movement
const followPointer = e => {
  const event = e.type === 'touchmove' ? e.touches[0] : e;
  cursor.x = event.pageX - viewport.w;
  cursor.y = event.pageY - viewport.h;

  mainLoop.play(); // Start animation only on movement
};

document.addEventListener('mousemove', followPointer);
document.addEventListener('touchmove', followPointer);
