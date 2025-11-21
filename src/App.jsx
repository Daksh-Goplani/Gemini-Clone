import { useState } from 'react'
import SideBar from './Components/Sidebar/SideBar'
import Main from './Components/Main/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SideBar/>
      <Main/>
    </>
  )
}

export default App
