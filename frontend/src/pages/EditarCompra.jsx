import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import CompraForm from '../components/CompraForm'

import { obtenerCompra, editarCompra } from '../services/comprasApi'

function EditarCompra() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [compra, setCompra] = useState(null)

  useEffect(() => {

    cargarCompra()

  }, []);

  async function cargarCompra() {
  try {
    const respuesta = await obtenerCompra(id);
    setCompra(respuesta);
  } catch (error) {
    console.error(error);
  }
}

  async function actualizarCompra(datosActualizados) {

    try {

      const respuesta = await editarCompra(
        id,
        datosActualizados
      )

      if (respuesta.operacion === "UPDATE") {

        alert("Compra actualizada correctamente")

        navigate("/")

      } else {

        alert("No fue posible actualizar")

      }

    } catch (error) {

      console.error(error)

      alert("Error al actualizar")

    }

  }

  if (!compra) {

    return (

      <div className="text-center mt-5">

        <h4>Cargando compra...</h4>

      </div>

    )

  }

  return (

    <div className="container">

      <h2 className="text-center mb-4">

        Editar Compra

      </h2>

      <CompraForm

        compraInicial={compra}

        onSubmit={actualizarCompra}

      />

    </div>

  )

}

export default EditarCompra