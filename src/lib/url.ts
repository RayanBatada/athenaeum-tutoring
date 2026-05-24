// Returns a properly-prefixed URL that respects Astro's BASE_URL.
// External URLs (http:, https:, mailto:, tel:) and pure anchors are passed through.
//
// Usage:
//   import { url } from '../lib/url';
//   <a href={url('/ap')}>AP</a>
//   <a href={url(`/tutors/${slug}`)}>tutor</a>
//   <a href={url('/#services')}>services</a>

const BASE = import.meta.env.BASE_URL; // trailing slash included when base is set

export function url(path: string): string {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path === '#'
  ) {
    return path;
  }
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return BASE + clean;
}
