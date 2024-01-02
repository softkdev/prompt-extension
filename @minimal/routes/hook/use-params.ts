import { useMemo } from 'react';
import queryString from 'querystring'

// ----------------------------------------------------------------------

export function useParams() {
  const params = queryString.parse(window.location.search);

  return useMemo(() => params, [params]);
}
