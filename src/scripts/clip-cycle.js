// Clip cycle: plays a project's screen recordings one after another, looping.
// - Autoplays (muted) only while the player is on screen, and never for visitors who prefer
//   reduced motion; they get a Play button instead.
// - Pause stops the cycle until the visitor presses Play again (WCAG 2.2.2).
// - The progress bars show where the cycle is and jump straight to a clip.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const root of document.querySelectorAll('[data-cycle]')) {
  const clips = JSON.parse(root.querySelector('[data-cycle-data]').textContent);
  const video = root.querySelector('[data-cycle-video]');
  const count = root.querySelector('[data-cycle-count]');
  const title = root.querySelector('[data-cycle-title]');
  const description = root.querySelector('[data-cycle-description]');
  const bars = [...root.querySelectorAll('[data-cycle-bar]')];
  const fills = [...root.querySelectorAll('[data-cycle-fill]')];
  const toggle = root.querySelector('[data-cycle-toggle]');
  const toggleLabel = root.querySelector('[data-cycle-toggle-label]');
  const iconPause = root.querySelector('[data-cycle-icon-pause]');
  const iconPlay = root.querySelector('[data-cycle-icon-play]');

  // Hand over from the no-JS version: our own controls replace the browser's.
  video.controls = false;
  root.querySelector('[data-cycle-fallback]').remove();

  let index = 0;
  let pausedByVisitor = reducedMotion.matches; // reduced motion: wait for an explicit Play
  let onScreen = false;

  function showClip(i) {
    index = (i + clips.length) % clips.length;
    const clip = clips[index];
    video.poster = clip.poster;
    video.src = clip.src;
    count.textContent = `${index + 1} / ${clips.length}`;
    title.textContent = clip.title;
    description.textContent = clip.description;
    bars.forEach((bar, b) => {
      if (b === index) bar.setAttribute('aria-current', 'true');
      else bar.removeAttribute('aria-current');
      fills[b].style.width = b < index ? '100%' : '0%';
    });
    // Warm the cache for the next clip so the switch is seamless.
    const next = document.createElement('video');
    next.preload = 'auto';
    next.muted = true;
    next.src = clips[(index + 1) % clips.length].src;
  }

  function setToggle() {
    const playing = !pausedByVisitor;
    toggleLabel.textContent = playing ? 'Pause' : 'Play';
    iconPause.hidden = !playing;
    iconPlay.hidden = playing;
  }

  function sync() {
    if (!pausedByVisitor && onScreen) video.play().catch(() => {});
    else video.pause();
    setToggle();
  }

  video.addEventListener('timeupdate', () => {
    if (video.duration) fills[index].style.width = `${(video.currentTime / video.duration) * 100}%`;
  });
  video.addEventListener('ended', () => {
    fills[index].style.width = '100%';
    showClip(index + 1);
    sync();
  });

  bars.forEach((bar, i) =>
    bar.addEventListener('click', () => {
      showClip(i);
      pausedByVisitor = false; // choosing a clip is a request to watch it
      sync();
    }),
  );

  toggle.addEventListener('click', () => {
    pausedByVisitor = !pausedByVisitor;
    sync();
  });

  // Play only while at least half the player is visible (also pauses when its tab is hidden).
  new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    },
    { threshold: 0.5 },
  ).observe(video);

  showClip(0);
  setToggle();
}
