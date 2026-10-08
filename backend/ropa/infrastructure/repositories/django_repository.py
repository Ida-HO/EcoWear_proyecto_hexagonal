from django.core.exceptions import ObjectDoesNotExist

from ropa.infrastructure.models import CompraModel, ProductoModel


class DjangoProductoRepository:
    def listar(self):
        return ProductoModel.objects.all()

    def obtener(self, producto_id: int):
        try:
            return ProductoModel.objects.get(pk=producto_id)
        except ProductoModel.DoesNotExist as exc:
            raise ValueError("Producto no encontrado") from exc

    def crear(self, data: dict):
        return ProductoModel.objects.create(**data)

    def actualizar(self, producto_id: int, data: dict):
        producto = self.obtener(producto_id)
        for campo, valor in data.items():
            setattr(producto, campo, valor)
        producto.save()
        return producto

    def eliminar(self, producto_id: int) -> None:
        producto = self.obtener(producto_id)
        try:
            producto.delete()
        except Exception as exc:
            # La FK usa PROTECT para no borrar un producto con compras asociadas.
            raise ValueError("No se puede eliminar un producto que tiene compras asociadas") from exc


class DjangoCompraRepository:
    def listar(self):
        return CompraModel.objects.select_related("producto").all()

    def obtener(self, compra_id: int):
        try:
            return CompraModel.objects.select_related("producto").get(pk=compra_id)
        except CompraModel.DoesNotExist as exc:
            raise ValueError("Compra no encontrada") from exc

    def crear(self, data: dict):
        return CompraModel.objects.create(**data)

    def actualizar(self, compra_id: int, data: dict):
        compra = self.obtener(compra_id)
        for campo, valor in data.items():
            setattr(compra, campo, valor)
        compra.save()
        return self.obtener(compra_id)

    def eliminar(self, compra_id: int) -> None:
        compra = self.obtener(compra_id)
        compra.delete()
