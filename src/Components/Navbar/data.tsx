import type { NavItem } from "../Type/navData";
export const navItem: NavItem[] = [
  {
    id: 1,
    path: '/',
    Name: 'Home',
  },

  {
    id: 2,
    path: '/AllApplication',
    Name: 'All Application',
    protected: true,
  },
  {
    id: 3,
    path: '/dashboard',
    Name: 'Dashboard',
    protected: true,
  },
  {
    id: 4,
    path: '/myApplication',
    Name: 'My Applications',
    protected: true,
  },
  {
    id: 5,
    path: '/applications/new',
    Name: 'Add Application',
    protected: true,
  },
 
]
