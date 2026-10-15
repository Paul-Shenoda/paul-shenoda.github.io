// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://paul-shenoda.github.io',
  output: 'static',
  // No Markdown code blocks on this site; Astro's default highlighter uses inline styles that a CSP blocks.
  markdown: { syntaxHighlight: false },
  security: {
    // Content Security Policy, written into each page as a <meta> tag (GitHub Pages can't send
    // custom headers). Astro adds a hash for every script and style it outputs, so the browser
    // runs only this site's own code and loads nothing from other domains.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self'",
        "font-src 'self'",
        "media-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
});
