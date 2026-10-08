const URL_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
const TOKEN = import.meta.env.VITE_API_TOKEN || ''

function headers() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${TOKEN}`
  }
}

export async function obtenerProductos() {
  const respuesta = await fetch(`${URL_BASE}/productos/`, { headers: headers() })
  const datos = await respuesta.json()
  if (!respuesta.ok) throw new Error(datos.error || datos.detail || 'Error al obtener productos')
  return datos
}
