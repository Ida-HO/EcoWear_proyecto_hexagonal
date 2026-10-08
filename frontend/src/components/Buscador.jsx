export default function Buscador({ busqueda, setBusqueda }) {
  return (
    <div className="mb-4">

      <input
        type="text"
        className="form-control"
        placeholder="Buscar compra por Id..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

    </div>
  )
}
