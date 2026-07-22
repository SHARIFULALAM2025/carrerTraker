import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../RootLayout/RootLayout'
import Home from '../Home/Home'
import dashboard from '../Dashboard/dashboard'

import Error from '../ErrorPage/Error'
import AddApplication from '../AddApplication/AddApplication'
import ApplicationDetails from '../ApplicationDetails/ApplicationDetails'
import ApplicationEdit from '../ApplicationEdit/ApplicationEdit'
import AuthLayout from '../AuthLayout/AuthLayout'
import Register from '../AuthLayout/Register'
import Login from '../AuthLayout/Login'
import MyApplication from '../MyApplication/MyApplication'
import AllApplication from '../AllApplication/AllApplication'

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/AllApplication',
        Component: AllApplication,
      },
      {
        path: '/dashboard',
        Component: dashboard,
      },
      {
        path: '/myApplication',
        Component: MyApplication,
      },
      {
        path: '/applications/new',
        Component: AddApplication,
      },
      {
        path: '/applications/:id',
        Component: ApplicationDetails,
      },
      {
        path: '/applications/:id/edit',
        Component: ApplicationEdit,
      },
      {
        path: '*',
        Component: Error,
      },
    ],
  },
  {
    path: 'auth',
    Component: AuthLayout,
    children: [
      {
        path: '/auth/register',
        Component: Register,
      },
      {
        path: '/auth/login',
        Component: Login,
      },
    ],
  },
])
export { router }
