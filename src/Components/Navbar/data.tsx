import type { NavItem } from "../Type/navData";
export const navItem: NavItem[] = [
  {
    id: 1,
    path: '/',
    Name: 'Home',
  },

  {
    id: 2,
    path: '/dashboard',
    Name: 'Dashboard',
    protected: true,
  },
  {
    id: 3,
    path: '/application',
    Name: 'My Applications',
    protected: true,
  },
  {
    id: 4,
    path: '/applications/new',
    Name: 'Add Application',
    protected: true,
  },
  {
    id: 5,
    path: '/applications/:id',
    Name: 'Application Details',
    protected: true,
  },
  {
    id: 6,
    path: '/applications/:id/edit',
    Name: 'Edit Application',
    protected: true,
  }
]
