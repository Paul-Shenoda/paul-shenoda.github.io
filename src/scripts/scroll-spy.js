// Highlights the nav link for the section in view. Every nav marked data-spy-nav is kept in sync.
const links = [...document.querySelectorAll('[data-spy-nav] a[href^="#"]')];
const ids = [...new Set(links.map((link) => link.hash.slice(1)))];
const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

// After a nav click, the clicked section keeps the highlight until the jump finishes.
let lockedId = null;
let unlockTimer;

function setCurrent(id) {
  for (const link of links) {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

// The current section is the last one whose top has passed 30% of the viewport height.
// Above the first section's own top it is the first section; at the very bottom it is the last.
function update() {
  if (lockedId) return;
  // Skip sections that aren't displayed (e.g. the unselected tab panel on a project page).
  const shown = sections.filter((section) => section.getClientRects().length > 0);
  if (!shown.length) return;
  const firstTop = shown[0].getBoundingClientRect().top;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let current = shown[0];
  if (atBottom) {
    current = shown[shown.length - 1];
  } else if (firstTop < -1) {
    for (const section of shown) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.3) current = section;
    }
  }
  setCurrent(current.id);
}

function unlock() {
  lockedId = null;
  clearTimeout(unlockTimer);
}

if (sections.length) {
  // Fires whenever a section crosses into or out of the top 30% of the viewport.
  const observer = new IntersectionObserver(update, { rootMargin: '0px 0px -70% 0px' });
  sections.forEach((section) => observer.observe(section));

  // The jump itself is a normal anchor link; this only manages the highlight.
  // Any link on the page that targets a tracked section counts (e.g. "Jump to how it works").
  const jumpLinks = [...document.querySelectorAll('a[href^="#"]')].filter((link) => ids.includes(link.hash.slice(1)));
  jumpLinks.forEach((link) =>
    link.addEventListener('click', () => {
      lockedId = link.hash.slice(1);
      setCurrent(lockedId);
      clearTimeout(unlockTimer);
      unlockTimer = setTimeout(unlock, 1200); // fallback for browsers without scrollend
    }),
  );
  window.addEventListener('scrollend', unlock);

  // Also re-check when scrolling settles: a short last section may never cross the line above,
  // so reaching the bottom of the page wouldn't otherwise trigger an update.
  let queued = false;
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    },
    { passive: true },
  );
  // A wheel, touch or key press means the visitor took over; follow the page again.
  ['wheel', 'touchstart', 'keydown'].forEach((type) =>
    window.addEventListener(
      type,
      () => {
        if (!lockedId) return;
        unlock();
        update();
      },
      { passive: true },
    ),
  );

  update();
}
