// Turns the Email button into a mailto: link in the browser. The address is stored base64-encoded
// in data-email, so it never appears as plain text in the HTML that scrapers collect.
for (const link of document.querySelectorAll('a[data-email]')) {
  link.href = `mailto:${atob(link.dataset.email)}`;
}
