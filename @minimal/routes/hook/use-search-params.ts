import queryString from 'querystring'

// ----------------------------------------------------------------------

export function useSearchParams() {
  const params = queryString.parse(window.location.search);

  return {
    get: (id) => params[id]
  }
}
