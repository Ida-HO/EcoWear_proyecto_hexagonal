from django.urls import path

from ropa.api.views import (
    CompraDetailView,
    CompraListCreateView,
    ProductoDetailView,
    ProductoListCreateView,
)

urlpatterns = [
    path("productos/", ProductoListCreateView.as_view(), name="productos-list-create"),
    path("productos/<int:pk>/", ProductoDetailView.as_view(), name="productos-detail"),
    path("compras/", CompraListCreateView.as_view(), name="compras-list-create"),
    path("compras/<int:pk>/", CompraDetailView.as_view(), name="compras-detail"),
]
