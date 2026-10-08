import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import VerCompras from './pages/VerCompras'
import AgregarCompra from './pages/AgregarCompra'
import EditarCompra from './pages/EditarCompra'
import EliminarCompra from './pages/EliminarCompra'
import CatalogoProductos from './pages/CatalogoProductos'

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<VerCompras />} />
          <Route path="/productos" element={<CatalogoProductos />} />
          <Route path="/agregar" element={<AgregarCompra />} />
          <Route path="/editar/:id" element={<EditarCompra />} />
          <Route path="/eliminar/:id" element={<EliminarCompra />} />
        </Routes>
      </div>
    </>
  )
}

export default App
