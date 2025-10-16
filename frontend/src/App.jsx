import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import LandingPage from './pages/Landing'
import Authentication from './pages/Authentication'
import { AuthProvider } from './contexts/AuthContext'
import VideoMeet from './pages/VideoMeet'
import HomeComponent from './pages/HomeComponent'
import History from './pages/History'
 
function App() {
  return (
   <>
    <Router>
    
    <AuthProvider>

     <Routes>
      
  
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/auth' element={<Authentication/>}/>
    <Route path='/home' element={<HomeComponent/>}/>
    <Route path='/history' element={<History/>}/>
    <Route path='/:url' element={<VideoMeet/>}/>
     </Routes>

  </AuthProvider>
    </Router> 

   </>
  )
}

export default App
