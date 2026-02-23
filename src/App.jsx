import Authentication from './pages/Authentication'
import Home from './components/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import HomeComponent from './pages/HomeComponent'
import History from './pages/History'
import VideoMeetComponent from './pages/VideoMeet'
import PageNotFound from './pages/PageNotFound'
import Features from './components/Features'
import Pricing from './components/Pricing'
import About from './components/About'
import Navbar from './Navbar'


const AppContent = () => {

  const location = useLocation()

 
  const hideNavbarRoutes = ['/home', '/history']

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Authentication/>}/>
        <Route path='/home' element={<HomeComponent/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/meet/:url' element={<VideoMeetComponent/>}/>
        <Route path='/features' element={<Features/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App