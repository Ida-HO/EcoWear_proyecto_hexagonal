# EcoWear Final - React + Django

Proyecto integrado para la evaluacion Back End. El frontend React conserva la estructura original y ahora consume el backend Django propio.

## Estructura

- `frontend/`: React + Vite
- `backend/`: Django + DRF + SQLite + arquitectura hexagonal

## 1. Backend

En una terminal:

```bash
cd backend
python -m venv venv
```

Windows CMD:

```bash
venv\Scripts\activate
```

PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Instalar y preparar:

```bash
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py cargar_productos_demo
python manage.py runserver
```

El backend queda en `http://127.0.0.1:8000`.

## 2. Obtener Token

Con el backend encendido, en Thunder Client:

`POST http://127.0.0.1:8000/api/token/`

Body JSON:

```json
{
  "username": "TU_USUARIO",
  "password": "TU_PASSWORD"
}
```

Copia el valor `token` de la respuesta.

## 3. Frontend

Copia `frontend/.env.example` como `frontend/.env` y reemplaza:

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_API_TOKEN=TU_TOKEN_REAL
```

Luego, en otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Abre la direccion que muestre Vite, normalmente `http://localhost:5173`.

## Endpoints

- `GET/POST /api/productos/`
- `GET/PUT/DELETE /api/productos/{id}/`
- `GET/POST /api/compras/`
- `GET/PUT/DELETE /api/compras/{id}/`
- `POST /api/token/`

Todos los endpoints de Producto y Compra requieren `Authorization: Token <token>`.

## Prueba rapida

1. Levanta Django.
2. Crea usuario y token.
3. Ejecuta `python manage.py cargar_productos_demo`.
4. Configura el token en `frontend/.env`.
5. Levanta React.
6. En Agregar Compra usa un `productoId` existente (los demo normalmente parten desde 1).

El backend recalcula el total de la compra y valida que cada `productoId` exista.

## Catálogo de productos

El frontend ahora incluye la ruta `/productos`, que consume `GET /api/productos/` y muestra el catálogo en tarjetas. El botón **Comprar** envía al formulario de compra con el producto preseleccionado mediante `?producto=<id>`. Se mantiene el CRUD de compras y el backend sin cambios.
