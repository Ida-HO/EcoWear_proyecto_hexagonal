from django.db import models


class ProductoModel(models.Model):
    """Modelo ORM de la entidad principal: Producto."""

    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=12, decimal_places=2)
    
    class Meta:
        db_table = "productos"
        ordering = ["id"]

    def __str__(self):
        return f"{self.nombre} - ${self.precio}"


class CompraModel(models.Model):
    """Modelo ORM de la entidad secundaria: Compra."""

    producto = models.ForeignKey(
        ProductoModel,
        on_delete=models.PROTECT,
        related_name="compras",
    )
    cliente_nombre = models.CharField(max_length=150)
    cliente_email = models.EmailField(max_length=254)
    cliente_direccion = models.CharField(max_length=250)
    items = models.JSONField(default=list)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    estado = models.CharField(max_length=50, default="pendiente")
    fecha = models.DateField()

    class Meta:
        db_table = "compras"
        ordering = ["-id"]

    def __str__(self):
        return f"Compra #{self.pk} - {self.cliente_nombre}"
