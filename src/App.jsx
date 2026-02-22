import Authentication from './pages/Authentication'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import HomeComponent from './pages/HomeComponent'
import History from './pages/History'
import VideoMeetComponent from './pages/VideoMeet'
import PageNotFound from './pages/PageNotFound'

const App = () => {
  return (
    <>
    
    <AuthProvider>

     <Routes>
       
  
    <Route path='/' element={<Home/>}/>
    <Route path='/auth' element={<Authentication/>}/>
    <Route path='/home' element={<HomeComponent/>}/>
    <Route path='/history' element={<History/>}/>
    <Route path='/meet/:url' element={<VideoMeetComponent/>}/>
    <Route path='*' element={<PageNotFound/>}/>
     </Routes>

  </AuthProvider>

     
    </>
  )
}

export default App