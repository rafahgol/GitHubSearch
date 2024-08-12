import { useState } from 'react'
import RepositorieSearch from "./components/repositorieSearch";
import Card from './components/card';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RepositorieSearch/>
    </>
  )
}

export default App
