// Minimal DOM helpers. Screens render a string of HTML into #app, then wire up
// the handful of nodes they care about.

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function mount(html) {
  const app = $('#app');
  app.innerHTML = html;
  app.scrollTop = 0;
  window.scrollTo(0, 0);
  return app;
}

export function on(sel, event, handler, root = document) {
  const node = $(sel, root);
  if (node) node.addEventListener(event, handler);
  return node;
}

/** Delegated listener — survives re-renders inside a container. */
export function delegate(root, selector, event, handler) {
  root.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && root.contains(target)) handler(e, target);
  });
}
