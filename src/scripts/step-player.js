// Step player: one stage at a time. Starts on stage 1, paused. Play advances every 4 seconds
// and stops on the last stage; Previous or Next stops playback.
const INTERVAL_MS = 4000;

for (const player of document.querySelectorAll('[data-player]')) {
  const steps = JSON.parse(player.querySelector('[data-step-data]').textContent);
  const stages = [...player.querySelectorAll('.stage')];
  const current = player.querySelector('[data-step-current]');
  const nameEl = player.querySelector('[data-step-name]');
  const textEl = player.querySelector('[data-step-text]');
  const counter = player.querySelector('[data-step-counter]');
  const prev = player.querySelector('[data-step-prev]');
  const next = player.querySelector('[data-step-next]');
  const play = player.querySelector('[data-step-play]');
  const playLabel = player.querySelector('[data-step-play-label]');
  const iconPlay = player.querySelector('[data-icon-play]');
  const iconPause = player.querySelector('[data-icon-pause]');

  let index = 0;
  let timer = null;

  // Each stage box becomes a button that jumps straight to that step. (Without JavaScript they stay
  // plain text, so there are no buttons that do nothing.) Attributes are copied so the styles apply.
  const stageButtons = stages.map((stage, i) => {
    const box = stage.querySelector('.stage-box');
    const button = document.createElement('button');
    for (const attr of box.attributes) button.setAttribute(attr.name, attr.value);
    button.type = 'button';
    button.textContent = box.textContent;
    button.setAttribute('aria-label', `Step ${i + 1} of ${stages.length}: ${box.textContent.trim()}`);
    button.addEventListener('click', () => go(i));
    box.replaceWith(button);
    return button;
  });

  function render() {
    stages.forEach((stage, i) => {
      if (i === index) {
        stage.setAttribute('aria-current', 'step');
        stageButtons[i].setAttribute('aria-current', 'step');
      } else {
        stage.removeAttribute('aria-current');
        stageButtons[i].removeAttribute('aria-current');
      }
    });
    nameEl.textContent = steps[index].name;
    textEl.textContent = steps[index].text;
    counter.textContent = `${index + 1} of ${steps.length}`;
    prev.setAttribute('aria-disabled', String(index === 0));
    next.setAttribute('aria-disabled', String(index === steps.length - 1));
  }

  function setPlaying(playing) {
    clearInterval(timer);
    timer = null;
    if (playing) timer = setInterval(tick, INTERVAL_MS);
    playLabel.textContent = playing ? 'Pause' : 'Play';
    iconPlay.hidden = playing;
    iconPause.hidden = !playing;
  }

  function tick() {
    // Stop if the player has been hidden (another tab or view was opened).
    if (player.getClientRects().length === 0 || index >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    index += 1;
    render();
    if (index === steps.length - 1) setPlaying(false);
  }

  function go(to) {
    setPlaying(false);
    if (to < 0 || to >= steps.length) return; // aria-disabled buttons do nothing
    index = to;
    render();
  }

  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  play.addEventListener('click', () => {
    if (timer) {
      setPlaying(false);
      return;
    }
    // Playing from the last stage starts again from the first.
    if (index === steps.length - 1) {
      index = 0;
      render();
    }
    setPlaying(true);
  });

  // Fill in stage 1 first, then switch from the no-JS list to the player,
  // so the live region doesn't announce anything on page load.
  render();
  player.querySelector('[data-step-list]').hidden = true;
  current.hidden = false;
  player.querySelector('[data-step-controls]').hidden = false;
}
