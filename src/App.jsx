import { useRoutes, BrowserRouter } from 'react-router-dom'

import NavBar from './Components/Navbar'
import HomePages from './Pages/HomePages'
import LoginPages from './Pages/LoginPages'
import RegisterUser from './Pages/RegisterUser'
import NotFound from './Pages/NotFound'
const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <HomePages /> },
    { path: '/login', element: <LoginPages /> },
    {path: '/registrar', element: <RegisterUser/> },
    {path: '/*', element: <NotFound/>}
  ])
  return routes
}
const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
