import { Link } from 'react-router-dom'

function CompraCard({ compra }) {

  return (
    <div className="col-md-6 col-lg-4 mb-4">

      <div className="card shadow h-100">

        <div className="card-header bg-success text-white">
          <h5 className="mb-0">

            Compra

          </h5>
        </div>

        <div className="card-body">

          <h6 className="fw-bold">
            Cliente
          </h6>

          <p className="mb-1">
            <strong>Nombre:</strong>{" "}
            {compra.cliente?.nombre}
          </p>

          <p className="mb-1">
            <strong>Email:</strong>{" "}
            {compra.cliente?.email}
          </p>

          <p className="mb-3">
            <strong>Dirección:</strong>{" "}
            {compra.cliente?.direccion}
          </p>

          <hr />

          <h6 className="fw-bold">
            Productos
          </h6>

          {
            compra.items?.map((item, index) => (

              <div
                key={index}
                className="border rounded p-2 mb-2"
              >

                <p className="mb-1">
                  <strong>Producto:</strong>{" "}
                  {item.nombre}
                </p>

                <p className="mb-1">
                  <strong>Talla:</strong>{" "}
                  {item.talla}
                </p>

                <p className="mb-1">
                  <strong>Color:</strong>{" "}
                  {item.color}
                </p>

                <p className="mb-1">
                  <strong>Cantidad:</strong>{" "}
                  {item.cantidad}
                </p>

                <p className="mb-0">
                  <strong>Precio:</strong> $
                  {item.precio}
                </p>

              </div>

            ))
          }

          <hr />

          <p className="mb-1">

            <strong>Total:</strong>

            ${compra.total}

          </p>

          <p className="mb-1">

            <strong>Estado:</strong>

            {compra.estado}

          </p>

          <p className="mb-0">

            <strong>Fecha:</strong>

            {compra.fecha}

          </p>

        </div>

        <div className="card-footer d-flex justify-content-between">

          <Link
            to={`/editar/${compra._id}`}
            className="btn btn-warning"
          >
            Editar
          </Link>

          <Link
            to={`/eliminar/${compra._id}`}
            className="btn btn-danger"
          >
            Eliminar
          </Link>

        </div>

      </div>

    </div>
  )

}

export default CompraCard
