from decimal import Decimal

from ropa.domain.entities.producto import Producto


class ListarProductos:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self):
        return self.repository.listar()


class ObtenerProducto:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, producto_id):
        return self.repository.obtener(producto_id)


class CrearProducto:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, data):
        entidad = Producto(
            id=None,
            nombre=data["nombre"],
            precio=Decimal(str(data["precio"])),
        )
        return self.repository.crear({
            "nombre": entidad.nombre.strip(),
            "precio": entidad.precio,
        })


class ActualizarProducto:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, producto_id, data):
        entidad = Producto(
            id=producto_id,
            nombre=data["nombre"],
            precio=Decimal(str(data["precio"])),
        )
        return self.repository.actualizar(producto_id, {
            "nombre": entidad.nombre.strip(),
            "precio": entidad.precio,
        })


class EliminarProducto:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, producto_id):
        return self.repository.eliminar(producto_id)
