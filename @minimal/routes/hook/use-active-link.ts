
// ----------------------------------------------------------------------

type ReturnType = boolean;

export function useActiveLink(path: string, deep = true): ReturnType {
  const { pathname } = window.location;

  const normalActive = path ? pathname === path : false;

  const deepActive = path ? pathname.indexOf(path) === 0 : false;

  return deep ? deepActive : normalActive;
}
