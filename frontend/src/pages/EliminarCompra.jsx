import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { eliminarCompra } from '../services/comprasApi'

function EliminarCompra() {

  const { id } = useParams()
  const navigate = useNavigate()

  // Evita ejecutar la eliminación dos veces
  const ejecutado = useRef(false)

  useEffect(() => {

    if (ejecutado.current) return

    ejecutado.current = true

    confirmarEliminacion()

  }, [])

  async function confirmarEliminacion() {

    const confirmar = window.confirm(
      "¿Está seguro de eliminar esta compra?"
    )

    if (!confirmar) {
      navigate("/")
      return
    }

    try {

      const respuesta = await eliminarCompra(id)

      if (respuesta.operacion === "DELETE") {

        alert("Compra eliminada correctamente")

      } else {

        alert("No fue posible eliminar la compra")

      }

    } catch (error) {

      console.error(error)

      alert("Error al eliminar la compra")

    }

    navigate("/")

  }

  return (

    <div className="container text-center mt-5">

      <h3>Eliminando compra...</h3>

    </div>

  )

}

export default EliminarCompra