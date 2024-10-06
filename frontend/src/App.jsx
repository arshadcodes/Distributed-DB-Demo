import { useState } from 'react'
import './App.css'
import FrontendDB from "./FrontendDB"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <FrontendDB />
    </>
  )
}

export default App
