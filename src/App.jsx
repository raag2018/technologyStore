import { useRoutes, BrowserRouter } from 'react-router-dom'
import ListCourseProvider from './Context/ListCourseContext'
import CorreoContextProvider from './Context/correoContext'
import NavBar from './Components/Navbar'
import HomePages from './Pages/HomePages'
import LoginPages from './Pages/LoginPages'
import RegisterUser from './Pages/RegisterUser'
import NotFound from './Pages/NotFound'
import UserType from './Pages/userType'
import CourseDetails from './Pages/CourseDetails'


const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <HomePages /> },
    { path: '/login', element: <LoginPages /> },
    { path: '/registrar', element: <RegisterUser /> },
    { path: '/*', element: <NotFound /> },
    { path: '/course/*', element: <CourseDetails />},
    ///auth/ seria de poner la funcion de autenticar la ruta de /dashboard
    { path: '/auth/dashboard', element: <UserType /> }

  ])
  return routes
}
const App = () => {
  return (
    <>
      <CorreoContextProvider>
        <ListCourseProvider>
          <BrowserRouter>
            <NavBar />
            <AppRoutes />
          </BrowserRouter>
        </ListCourseProvider>
      </CorreoContextProvider>

    </>
  )
}

export default App
