import type { NextConfig } from 'next';

// vision-studio-blob store (shared with vision-showpiece).
const BLOB_VIDEO_BASE = 'https://hqpx7ubkrncoumn5.public.blob.vercel-storage.com';

// Booking moved to the standalone portal. The old on-site funnel is gone, so
// /book and everything under it forwards there rather than 404-ing the links
// already out in listings, email footers and search results.
const PORTAL_BOOK = 'https://portal.wonvision.com.au/book';

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/index.html',             destination: '/',                  permanent: true },
      { source: '/gallery.html',           destination: '/gallery',           permanent: true },

      // Retired pages. Legacy .html links land on the portal too, in one hop.
      { source: '/book',                   destination: PORTAL_BOOK,          permanent: true },
      { source: '/book/:path*',            destination: PORTAL_BOOK,          permanent: true },
      { source: '/book.html',              destination: PORTAL_BOOK,          permanent: true },
      { source: '/book-checkout.html',     destination: PORTAL_BOOK,          permanent: true },
      { source: '/book-schedule.html',     destination: PORTAL_BOOK,          permanent: true },
      { source: '/book-confirmation.html', destination: PORTAL_BOOK,          permanent: true },
      { source: '/operate',                destination: '/',                  permanent: true },

      // Videos live in Vercel Blob, not git — public/video/*.mp4 is gitignored.
      // ponytail: one redirect beats rewriting ~40 hardcoded src paths, and a
      // 307 (not a rewrite) means range requests hit Blob directly instead of
      // streaming 45MB files back through a function.
      // To add a video: drop it in public/video/ and run `npm run blob:push`.
      {
        source: '/video/:file',
        destination: `${BLOB_VIDEO_BASE}/video/:file`,
        permanent: false,
      },
    ];
  },
};

export default config;
