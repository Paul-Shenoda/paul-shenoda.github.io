// Phone project page: the bottom nav switches between three views instead of scrolling.
//   overview      -> the Overview section only
//   write-up      -> the Write-up panel only
//   how-it-works  -> the step player only
// The CSS for this only applies below 1024px, so desktop is unaffected. Without JavaScript
// data-view is never set and all three show, one after the other.
const root = document.querySelector('[data-views]');
const nav = document.querySelector('[data-view-nav]');

if (root && nav) {
  const links = [...nav.querySelectorAll('a[href^="#"]')];

  function show(view) {
    root.dataset.view = view === 'overview' ? 'overview' : 'details';
    // The Write-up and How it works panels are tabs; reuse tabs.js by clicking the matching tab.
    if (view !== 'overview') document.getElementById(`tab-${view}`)?.click();
    links.forEach((link) => {
      if (link.hash === `#${view}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  links.forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const view = link.hash.slice(1);
      show(view);
      history.replaceState(null, '', `#${view}`);
      window.scrollTo({ top: 0 });
      // Put keyboard and screen reader focus at the start of the new view.
      root.focus({ preventScroll: true });
    }),
  );

  // "See how it works" button in the Overview's summary box.
  document.querySelectorAll('[data-show-view]').forEach((button) =>
    button.addEventListener('click', () => {
      const link = links.find((l) => l.hash === `#${button.dataset.showView}`);
      link?.click();
    }),
  );

  // View from the URL (e.g. a shared link to #how-it-works), otherwise Overview.
  // Also runs on hash changes, so links to these hashes and the Back button work.
  const isView = (id) => links.some((l) => l.hash === `#${id}`);
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (isView(id)) show(id);
  });
  const initial = location.hash.slice(1);
  show(isView(initial) ? initial : 'overview');
}
