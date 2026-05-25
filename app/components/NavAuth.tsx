'use client';

import { useUser, UserButton } from '@clerk/nextjs';

/**
 * Auth-aware nav slot. Slots into the marketing navbar's right side
 * alongside the Book now CTA. Pure B/W, sharp edges — matches the
 * Won Vision brand system.
 *
 * Clerk v7 dropped <SignedIn>/<SignedOut> — branch on useUser() instead.
 * Render nothing until Clerk is loaded to avoid a flash of either state.
 */
export default function NavAuth() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <a href="/sign-in" className="nav__auth-link" aria-label="Sign in to client portal">
        Sign in
      </a>
    );
  }

  return (
    <>
      <a href="/portal" className="nav__auth-link" aria-label="Open client portal">
        Portal
      </a>
      <span className="nav__auth-userbtn">
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: 28,
                height: 28,
                borderRadius: 0,
                border: '1px solid #000',
              },
            },
          }}
        />
      </span>
    </>
  );
}
