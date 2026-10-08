import { useNavigate } from 'react-router-dom'
import CompraForm from '../components/CompraForm'
import { crearCompra } from '../services/comprasApi'

function AgregarCompra() {

  const navigate = useNavigate()

  async function guardarCompra(compra) {

    try {

      const respuesta = await crearCompra(compra)

      if (respuesta.operacion === "CREATE") {

        alert("Compra registrada correctamente")

        navigate("/")

      } else {

        alert("No fue posible registrar la compra")

      }

    } catch (error) {

      console.error(error)

      alert("Error al conectar con la API")

    }

  }

  return (

    <div className="container">

      <h2 className="text-center mb-4">

        Agregar Compra

      </h2>

      <CompraForm
        onSubmit={guardarCompra}
      />

    </div>

  )

}

export default AgregarCompra
