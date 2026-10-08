import { useEffect, useState } from 'react'
import { obtenerCompras } from '../services/comprasApi'
import CompraCard from '../components/CompraCard'

function VerCompras() {

  const [compras, setCompras] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarCompras()
  }, [])

  async function cargarCompras() {
    try {
      const respuesta = await obtenerCompras()

      if (respuesta.datos) {
        setCompras(respuesta.datos)
      } else {
        setCompras([])
      }

    } catch (error) {
      console.error("Error al obtener compras:", error)
    } finally {
      setCargando(false)
    }
  }

  if (cargando) {
    return (
      <div className="text-center mt-5">
        <h4>Cargando compras...</h4>
      </div>
    )
  }

  return (
    <div>

      <h2 className="text-center mb-4">
        Gestión de Compras
      </h2>

      {
        compras.length === 0
          ?
          (
            <div className="alert alert-warning text-center">
              No existen compras registradas.
            </div>
          )
          :
          (
            <div className="row">

              {
                compras.map((compra) => (
                  <CompraCard
                    key={compra._id}
                    compra={compra}
                  />
                ))
              }

            </div>
          )
      }

    </div>
  )
}

export default VerCompras
