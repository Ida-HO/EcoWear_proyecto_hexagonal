# EcoWear Backend - Django + Arquitectura Hexagonal

Backend propio para la evaluacion de Back End del proyecto EcoWear.

## 1. Tecnologias

- Python
- Django
- Django REST Framework
- SQLite
- Token Authentication
- CORS para conectar con el React/Vite del proyecto anterior

## 2. Arquitectura

El backend esta separado en 4 capas:

```text
ropa/
├── domain/
│   ├── entities/
│   └── repositories/
├── application/
│   ├── productos/
│   └── compras/
├── infrastructure/
│   ├── models.py
│   └── repositories/
└── api/
    ├── serializers.py
    ├── views.py
    └── urls.py
```

- `domain`: entidades puras y contratos.
- `application`: casos de uso y logica de negocio.
- `infrastructure`: Django ORM, SQLite y repositorios concretos.
- `api`: serializers, vistas y rutas HTTP.

## 3. Entidades

### Producto

Campos:

- `id`
- `nombre`
- `precio`

### Compra

Campos:

- `id`
- `producto` -> ForeignKey a Producto
- `cliente_nombre`
- `cliente_email`
- `cliente_direccion`
- `items` -> JSONField
- `total`
- `estado`
- `fecha`

El `JSONField` mantiene el array de items que ya utilizaba el React del semestre pasado sin crear una tercera entidad.

## 4. Instalacion

Desde la carpeta `backend`:

```bash
python -m venv venv
```

Windows:

```bash
venv\\Scripts\\activate
```

Luego:

```bash
python -m pip install -r requirements.txt
python manage.py migrate
```

## 5. Crear usuario administrador

```bash
python manage.py createsuperuser
```

Completa usuario, email y password.

## 6. Crear token

Con el usuario ya creado:

```bash
python manage.py drf_create_token NOMBRE_USUARIO
```

Tambien puedes entrar a:

```text
http://127.0.0.1:8000/admin/
```

y revisar el token desde la administracion si agregas Token a las pantallas administrativas.

## 7. Cargar productos de prueba

Opcional:

```bash
python manage.py cargar_productos_demo
```

Esto crea algunos productos basicos para probar el CRUD.

## 8. Levantar el backend

```bash
python manage.py runserver
```

La API queda en:

```text
http://127.0.0.1:8000/api/
```

## 9. Autenticacion

Todos los endpoints API estan protegidos.

En Thunder Client debes enviar:

```text
Authorization: Token TU_TOKEN
```

Para pedir un token tambien existe:

```text
POST http://127.0.0.1:8000/api/token/
```

Body JSON:

```json
{
  "username": "tu_usuario",
  "password": "tu_password"
}
```

## 10. Endpoints

### Productos

```text
GET    /api/productos/
GET    /api/productos/{id}/
POST   /api/productos/
PUT    /api/productos/{id}/
DELETE /api/productos/{id}/
```

Ejemplo POST:

```json
{
  "nombre": "Polera Organica",
  "precio": 15990
}
```

### Compras

```text
GET    /api/compras/
GET    /api/compras/{id}/
POST   /api/compras/
PUT    /api/compras/{id}/
DELETE /api/compras/{id}/
```

Ejemplo POST compatible con el React anterior:

```json
{
  "cliente": {
    "nombre": "Camila Rojas",
    "email": "camila@correo.com",
    "direccion": "Los Aromos 45"
  },
  "items": [
    {
      "productoId": "1",
      "nombre": "Polera Organica",
      "talla": "M",
      "color": "verde",
      "precio": 15990,
      "cantidad": 1
    }
  ],
  "estado": "pendiente",
  "fecha": "2026-07-08"
}
```

El backend calcula nuevamente el total a partir de los items.

## 11. Orden recomendado para probar

1. `python manage.py migrate`
2. Crear superusuario.
3. Crear token.
4. Crear un producto con POST.
5. Probar GET de productos.
6. Crear una compra usando el `productoId` creado.
7. Probar GET, PUT y DELETE de compras.
8. Probar PUT y DELETE de productos.
9. Recién despues conectar el React y cambiar `src/services/comprasApi.js`.

## 12. Front End

Este backend esta preparado para recibir el formato de datos que ya usaba EcoWear, para facilitar la migracion desde `https://apiclases.inacode.cl/ropa` al backend propio.
