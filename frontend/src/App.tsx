import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Cartoes from './pages/Cartoes'
import Dividas from './pages/Dividas'
import { Toaster } from 'sonner'  
import Parcelas from './pages/Parcelas'

function App() {
  return (
    <Router>
      <div className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Prospera Lumina</h1>
        <nav className="flex gap-16">
          <Link to="/" className="hover:underline text-blue-600">Cartões</Link>
          <Link to="/dividas" className="hover:underline text-blue-600">Dívidas </Link>
          {/* <Link to="/parcelas" className="hover:underline text-blue-600">Parcelas</Link> */}
        </nav>
      </div>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Cartoes />} />
          <Route path="/dividas" element={<Dividas />} />
          <Route path="/parcelas/:id" element={<Parcelas />} />
        </Routes>
      </div>

      <Toaster position="top-right" />
    </Router>
  )
}

export default App
