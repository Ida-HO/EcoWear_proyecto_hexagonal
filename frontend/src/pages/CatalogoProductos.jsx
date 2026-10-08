import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerProductos } from '../services/productosApi'

function CatalogoProductos() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarProductos()
  }, [])

  async function cargarProductos() {
    try {
      setCargando(true)
      setError('')
      const respuesta = await obtenerProductos()
      setProductos(respuesta.datos || [])
    } catch (err) {
      console.error(err)
      setError('No fue posible cargar el catálogo de productos.')
    } finally {
      setCargando(false)
    }
  }

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    if (!texto) return productos
    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(texto)
    )
  }, [productos, busqueda])

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="mb-1">Catálogo de Productos</h1>
          <p className="text-muted mb-0">
            Productos disponibles directamente desde la API de EcoWear.
          </p>
        </div>

        <div style={{ maxWidth: '340px', width: '100%' }}>
          <input
            type="search"
            className="form-control"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {cargando && (
        <div className="alert alert-info">Cargando catálogo...</div>
      )}

      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <button className="btn btn-outline-danger btn-sm" onClick={cargarProductos}>
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && productosFiltrados.length === 0 && (
        <div className="alert alert-warning">
          No hay productos que coincidan con la búsqueda.
        </div>
      )}

      <div className="row g-4">
        {productosFiltrados.map((producto) => (
          <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <div className="mb-3">
                  <span className="badge bg-success-subtle text-success border border-success-subtle">
                    Producto #{producto.id}
                  </span>
                </div>

                <div
                  className="bg-light rounded d-flex align-items-center justify-content-center mb-3"
                  style={{ minHeight: '150px', fontSize: '3.5rem' }}
                  aria-hidden="true"
                >
                  👕
                </div>

                <h4 className="card-title">{producto.nombre}</h4>
                <p className="text-muted mb-2">EcoWear</p>

                <div className="mt-auto pt-3">
                  <div className="fs-4 fw-bold text-success mb-3">
                    ${Number(producto.precio).toLocaleString('es-CL')}
                  </div>

                  <Link
                    className="btn btn-success w-100"
                    to={`/agregar?producto=${producto.id}`}
                  >
                    Comprar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatalogoProductos
