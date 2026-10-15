// Tabs (WAI-ARIA APG pattern, automatic activation). Without JavaScript none of this runs:
// the tab buttons stay hidden and both panels show, one after the other.
const tablist = document.querySelector('[data-tabs]');

if (tablist) {
  const tabs = [...tablist.querySelectorAll('[data-tab]')];
  const panels = tabs.map((tab) => document.getElementById(tab.dataset.tab));

  tablist.setAttribute('role', 'tablist');
  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.id = `tab-${panels[i].id}`;
    tab.setAttribute('aria-controls', panels[i].id);
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', tab.id);
    panels[i].tabIndex = 0;
  });
  tablist.hidden = false;

  function select(index, { focus = false } = {}) {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (focus) tabs[index].focus();
  }

  const indexFor = (id) => panels.findIndex((panel) => panel.id === id);

  // Opening a tab from a link or the URL: select it and bring the tabs into view.
  // From a link, focus moves to the tab so keyboard users carry on from there.
  function openFromHash(id, { focus = false } = {}) {
    const index = indexFor(id);
    if (index === -1) return false;
    select(index);
    if (focus) tabs[index].focus({ preventScroll: true });
    tablist.scrollIntoView({ block: 'start' });
    return true;
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      select(i);
      history.replaceState(null, '', `#${panels[i].id}`);
    });
  });

  tablist.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    const last = tabs.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next, { focus: true });
    history.replaceState(null, '', `#${panels[next].id}`);
  });

  // Links to #write-up or #how-it-works anywhere on the page (side nav, "Jump to architecture").
  // Handled here because the target panel may be hidden, which would make the normal jump fail.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const id = link.hash.slice(1);
    // The phone bottom nav has its own handler (project-views.js).
    if (indexFor(id) === -1 || link.closest('[data-view-nav]')) return;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      history.pushState(null, '', `#${id}`);
      openFromHash(id, { focus: true });
    });
  });

  window.addEventListener('hashchange', () => openFromHash(location.hash.slice(1)));

  // Initial state: the tab named in the URL, otherwise the first.
  if (!openFromHash(location.hash.slice(1))) select(0);
}
