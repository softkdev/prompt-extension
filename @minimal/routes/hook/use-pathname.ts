import { useMemo } from 'react';

// ----------------------------------------------------------------------

export function usePathname() {
  const { pathname } = window.location;

  return useMemo(() => pathname, [pathname]);
}
