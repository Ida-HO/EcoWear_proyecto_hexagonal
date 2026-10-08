const URL_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
const TOKEN = import.meta.env.VITE_API_TOKEN || ''

function headers() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${TOKEN}`
  }
}

async function procesarRespuesta(respuesta) {
  let datos = {}
  try {
    datos = await respuesta.json()
  } catch {
    datos = {}
  }

  if (!respuesta.ok) {
    const mensaje = datos.error || datos.detail || 'Error al conectar con la API'
    throw new Error(mensaje)
  }

  return datos
}

export async function obtenerCompras() {
  const respuesta = await fetch(`${URL_BASE}/compras/`, {
    method: 'GET',
    headers: headers()
  })
  return procesarRespuesta(respuesta)
}

export async function obtenerCompra(id) {
  const respuesta = await fetch(`${URL_BASE}/compras/${id}/`, {
    method: 'GET',
    headers: headers()
  })
  return procesarRespuesta(respuesta)
}

export async function crearCompra(compra) {
  const respuesta = await fetch(`${URL_BASE}/compras/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(compra)
  })
  return procesarRespuesta(respuesta)
}

export async function editarCompra(id, compra) {
  const respuesta = await fetch(`${URL_BASE}/compras/${id}/`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(compra)
  })
  return procesarRespuesta(respuesta)
}

export async function eliminarCompra(id) {
  const respuesta = await fetch(`${URL_BASE}/compras/${id}/`, {
    method: 'DELETE',
    headers: headers()
  })
  return procesarRespuesta(respuesta)
}
