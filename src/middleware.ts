import { defineMiddleware } from 'astro:middleware';

// Add any page or route prefix you want to temporarily hold back
const UNFINISHED_PATHS = ['/writing', '/now'];

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  const isUnfinished = UNFINISHED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isUnfinished) {
    // Redirects the browser to /not-yet (and passes where they came from!)
    return context.redirect(`/not-yet?from=${encodeURIComponent(pathname)}`, 302);
  }

  return next();
});