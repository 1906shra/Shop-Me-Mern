import { useState } from 'react'
import { BrowserRouter,Routes ,Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
     <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
     </BrowserRouter>
   </>
  )
}

export default App
