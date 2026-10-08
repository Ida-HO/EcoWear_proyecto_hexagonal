from datetime import date
from decimal import Decimal

from ropa.domain.entities.compra import Compra


class ListarCompras:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self):
        return self.repository.listar()


class ObtenerCompra:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, compra_id):
        return self.repository.obtener(compra_id)


class CrearCompra:
    def __init__(self, repository, producto_repository):
        self.repository = repository
        self.producto_repository = producto_repository

    def ejecutar(self, data):
        normalizada = _normalizar_compra(data, self.producto_repository)
        entidad = Compra(**normalizada)
        return self.repository.crear({
            "producto_id": entidad.producto_id,
            "cliente_nombre": entidad.cliente_nombre.strip(),
            "cliente_email": entidad.cliente_email.strip(),
            "cliente_direccion": entidad.cliente_direccion.strip(),
            "items": entidad.items,
            "total": entidad.total,
            "estado": entidad.estado,
            "fecha": entidad.fecha,
        })


class ActualizarCompra:
    def __init__(self, repository, producto_repository):
        self.repository = repository
        self.producto_repository = producto_repository

    def ejecutar(self, compra_id, data):
        normalizada = _normalizar_compra(data, self.producto_repository, compra_id=compra_id)
        entidad = Compra(**normalizada)
        return self.repository.actualizar(compra_id, {
            "producto_id": entidad.producto_id,
            "cliente_nombre": entidad.cliente_nombre.strip(),
            "cliente_email": entidad.cliente_email.strip(),
            "cliente_direccion": entidad.cliente_direccion.strip(),
            "items": entidad.items,
            "total": entidad.total,
            "estado": entidad.estado,
            "fecha": entidad.fecha,
        })


class EliminarCompra:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, compra_id):
        return self.repository.eliminar(compra_id)


def _normalizar_compra(data, producto_repository, compra_id=None):
    cliente = data.get("cliente") or {}
    items = data.get("items") or []
    if not isinstance(items, list) or not items:
        raise ValueError("items debe contener al menos un producto")

    primer_producto_id = data.get("producto")
    if primer_producto_id in (None, ""):
        primer_producto_id = items[0].get("productoId")

    try:
        primer_producto_id = int(primer_producto_id)
    except (TypeError, ValueError) as exc:
        raise ValueError("productoId debe ser un numero entero") from exc

    # Verifica que la relacion realmente exista.
    producto_repository.obtener(primer_producto_id)

    items_limpios = []
    total = Decimal("0")
    for item in items:
        try:
            producto_id = int(item.get("productoId"))
        except (TypeError, ValueError) as exc:
            raise ValueError("Cada item debe tener un productoId valido") from exc

        producto = producto_repository.obtener(producto_id)

        # Nombre y precio se obtienen del catalogo real.
        precio = Decimal(str(producto.precio))
        try:
            cantidad = int(item.get("cantidad"))
        except (TypeError, ValueError, ArithmeticError) as exc:
            raise ValueError("Cantidad invalida en items") from exc

        if cantidad <= 0:
            raise ValueError("La cantidad debe ser mayor que 0")

        item_limpio = {
            "productoId": producto_id,
            "nombre": str(producto.nombre).strip(),
            "talla": str(item.get("talla", "")).strip(),
            "color": str(item.get("color", "")).strip(),
            "precio": float(precio),
            "cantidad": cantidad,
        }
        items_limpios.append(item_limpio)
        total += precio * cantidad

    fecha = data.get("fecha") or date.today().isoformat()
    if isinstance(fecha, str):
        fecha = date.fromisoformat(fecha[:10])

    return {
        "id": compra_id,
        "producto_id": primer_producto_id,
        "cliente_nombre": str(cliente.get("nombre", "")),
        "cliente_email": str(cliente.get("email", "")),
        "cliente_direccion": str(cliente.get("direccion", "")),
        "items": items_limpios,
        "total": total,
        "estado": str(data.get("estado", "pendiente")),
        "fecha": fecha,
    }
