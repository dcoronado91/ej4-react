import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/items" element={<div>Lista</div>} />
      <Route path="/items/:id" element={<div>Detalle</div>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}

export default App
