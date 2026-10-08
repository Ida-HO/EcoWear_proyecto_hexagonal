import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { obtenerProductos } from '../services/productosApi'

function CompraForm({ onSubmit, compraInicial = null }) {
  const [searchParams] = useSearchParams()
  const [cliente, setCliente] = useState({
    nombre: compraInicial?.cliente?.nombre || "",
    email: compraInicial?.cliente?.email || "",
    direccion: compraInicial?.cliente?.direccion || ""
  })

  const [item, setItem] = useState({
    productoId: compraInicial?.items?.[0]?.productoId || "",
    nombre: compraInicial?.items?.[0]?.nombre || "",
    talla: compraInicial?.items?.[0]?.talla || "",
    color: compraInicial?.items?.[0]?.color || "",
    precio: compraInicial?.items?.[0]?.precio || "",
    cantidad: compraInicial?.items?.[0]?.cantidad || 1
  })

  const [productos, setProductos] = useState([])
  const [cargandoProductos, setCargandoProductos] = useState(true)
  const [errorProductos, setErrorProductos] = useState("")
  const [estado, setEstado] = useState(compraInicial?.estado || "pendiente")
  const [fecha, setFecha] = useState(compraInicial?.fecha || "")

  useEffect(() => {
    cargarProductos()
  }, [])

  async function cargarProductos() {
    try {
      setCargandoProductos(true)
      const respuesta = await obtenerProductos()
      const productosCargados = respuesta.datos || []
      setProductos(productosCargados)

      // Si se llega desde el catálogo con ?producto=ID, lo seleccionamos automáticamente.
      if (!compraInicial && !item.productoId) {
        const productoIdUrl = Number(searchParams.get('producto'))
        const productoUrl = productosCargados.find((p) => p.id === productoIdUrl)

        if (productoUrl) {
          setItem((actual) => ({
            ...actual,
            productoId: productoUrl.id,
            nombre: productoUrl.nombre,
            precio: Number(productoUrl.precio)
          }))
        }
      }
    } catch (error) {
      console.error(error)
      setErrorProductos("No fue posible cargar los productos")
    } finally {
      setCargandoProductos(false)
    }
  }

  function seleccionarProducto(e) {
    const id = Number(e.target.value)
    const producto = productos.find((p) => p.id === id)

    if (!producto) {
      setItem({ ...item, productoId: "", nombre: "", precio: "" })
      return
    }

    setItem({
      ...item,
      productoId: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio)
    })
  }

  function enviarFormulario(e) {
    e.preventDefault()

    const compra = {
      cliente,
      producto: Number(item.productoId),
      items: [{
        ...item,
        productoId: Number(item.productoId),
        precio: Number(item.precio),
        cantidad: Number(item.cantidad)
      }],
      total: Number(item.precio) * Number(item.cantidad),
      estado,
      fecha
    }

    onSubmit(compra)
  }

  const total = Number(item.precio || 0) * Number(item.cantidad || 0)

  return (
    <form onSubmit={enviarFormulario}>
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">Formulario Compra</h4>
        </div>

        <div className="card-body">
          <h5>Cliente</h5>

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={cliente.nombre}
              onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={cliente.email}
              onChange={(e) => setCliente({ ...cliente, email: e.target.value })} required />
          </div>

          <div className="mb-4">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" value={cliente.direccion}
              onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })} required />
          </div>

          <hr />
          <h5>Producto</h5>

          <div className="mb-3">
            <label className="form-label">Producto</label>
            <select className="form-select" value={item.productoId} onChange={seleccionarProducto}
              disabled={cargandoProductos} required>
              <option value="">{cargandoProductos ? "Cargando productos..." : "Seleccione un producto"}</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre} - ${Number(producto.precio).toLocaleString('es-CL')}
                </option>
              ))}
            </select>
            {errorProductos && <div className="text-danger mt-2">{errorProductos}</div>}
          </div>

          {item.productoId && (
            <div className="alert alert-light border">
              <strong>Producto:</strong> {item.nombre}<br />
              <strong>Precio unitario:</strong> ${Number(item.precio).toLocaleString('es-CL')}
            </div>
          )}

          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Talla</label>
              <select className="form-select" value={item.talla}
                onChange={(e) => setItem({ ...item, talla: e.target.value })} required>
                <option value="">Seleccione</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Color</label>
              <input type="text" className="form-control" value={item.color}
                onChange={(e) => setItem({ ...item, color: e.target.value })} required />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <label className="form-label">Cantidad</label>
              <input type="number" min="1" className="form-control" value={item.cantidad}
                onChange={(e) => setItem({ ...item, cantidad: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Total</label>
              <input type="text" className="form-control"
                value={`$${total.toLocaleString('es-CL')}`} readOnly />
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Estado</label>
              <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="pagado">Pagado</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Fecha</label>
              <input type="date" className="form-control" value={fecha}
                onChange={(e) => setFecha(e.target.value)} required />
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button className="btn btn-success" type="submit" disabled={!item.productoId || cargandoProductos}>
            Guardar Compra
          </button>
        </div>
      </div>
    </form>
  )
}

export default CompraForm
