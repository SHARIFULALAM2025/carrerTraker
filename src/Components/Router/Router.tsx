import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../RootLayout/RootLayout'
import Home from '../Home/Home'
import dashboard from '../Dashboard/dashboard'
import Application from '../Application/Application'
import Error from '../ErrorPage/Error'
import AddApplication from '../AddApplication/AddApplication'
import ApplicationDetails from '../ApplicationDetails/ApplicationDetails'
import ApplicationEdit from '../ApplicationEdit/ApplicationEdit'

const router = createBrowserRouter([
  {
    path: '/',
    ErrorBoundary: Error,
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/dashboard',
        Component: dashboard,
      },
      {
        path: '/application',
        Component: Application,
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
    ],
  },
])
export { router }
