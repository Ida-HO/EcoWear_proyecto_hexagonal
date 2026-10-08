from django.contrib import admin

from ropa.infrastructure.models import CompraModel, ProductoModel


@admin.register(ProductoModel)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "precio")
    search_fields = ("nombre",)


@admin.register(CompraModel)
class CompraAdmin(admin.ModelAdmin):
    list_display = ("id", "cliente_nombre", "producto", "total", "estado", "fecha")
    search_fields = ("cliente_nombre", "cliente_email")
    list_filter = ("estado", "fecha")
