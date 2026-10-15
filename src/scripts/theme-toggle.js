// Theme toggle. The inline script in Base.astro's <head> sets the starting theme before the page
// paints; this keeps every [data-theme-toggle] button in step and saves the visitor's choice.
const root = document.documentElement;
const buttons = [...document.querySelectorAll('[data-theme-toggle]')];

function render() {
  const dark = root.dataset.theme === 'dark';
  // Each button names the action it performs: in light mode it offers the dark theme.
  const action = dark ? 'Light theme' : 'Dark theme';
  for (const button of buttons) {
    const label = button.querySelector('[data-theme-label]');
    if (label) label.textContent = action;
    else button.setAttribute('aria-label', `Switch to ${action.toLowerCase()}`);
    button.querySelector('[data-theme-icon="moon"]').hidden = dark;
    button.querySelector('[data-theme-icon="sun"]').hidden = !dark;
  }
}

function save(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    // Storage blocked (private mode, strict settings): the toggle still works for this page.
  }
}

buttons.forEach((button) =>
  button.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    save(theme);
    render();
  }),
);

// Visitors who never chose follow their system setting, even if it changes while the page is open.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  let saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (e) {}
  if (saved) return;
  root.dataset.theme = event.matches ? 'dark' : 'light';
  render();
});

render();
