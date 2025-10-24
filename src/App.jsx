
import './App.css'
import Header from './component/header'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import HomePage from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import { Toaster } from 'react-hot-toast'




function App() {
  

  return (
    <BrowserRouter>
    <div>
      <Toaster position='top-right'/>
      <Header></Header>
     <Routes path="/">
     <Route path='/' element={<HomePage/>}/>
     <Route path='/login' element={<LoginPage/>}/>
     <Route path='/signup' element={<SignupPage/>}/>
     <Route path='/admin/*' element={<AdminPage/>}/>
     <Route path='/*' element={<h1>404 not found error</h1>}></Route>
     
     </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
