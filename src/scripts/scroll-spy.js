// Highlights the nav link for the section in view. Every nav marked data-spy-nav is kept in sync.
const links = [...document.querySelectorAll('[data-spy-nav] a[href^="#"]')];
const ids = [...new Set(links.map((link) => link.hash.slice(1)))];
const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

function setCurrent(id) {
  for (const link of links) {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

// The current section is the last one whose top has passed 30% of the viewport height.
// At the very top it is the first section; at the very bottom it is the last.
function update() {
  if (!sections.length) return;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let current = sections[0];
  if (atBottom) {
    current = sections[sections.length - 1];
  } else if (window.scrollY > 0) {
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.3) current = section;
    }
  }
  setCurrent(current.id);
}

if (sections.length) {
  // Fires whenever a section crosses into or out of the top 30% of the viewport.
  const observer = new IntersectionObserver(update, { rootMargin: '0px 0px -70% 0px' });
  sections.forEach((section) => observer.observe(section));
  // The jump itself is a normal anchor link; this just updates the highlight straight away.
  links.forEach((link) => link.addEventListener('click', () => setCurrent(link.hash.slice(1))));
  update();
}
