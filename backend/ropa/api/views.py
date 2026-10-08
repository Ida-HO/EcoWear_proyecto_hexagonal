from datetime import date

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ropa.application.compras.use_cases import (
    ActualizarCompra,
    CrearCompra,
    EliminarCompra,
    ListarCompras,
    ObtenerCompra,
)
from ropa.application.productos.use_cases import (
    ActualizarProducto,
    CrearProducto,
    EliminarProducto,
    ListarProductos,
    ObtenerProducto,
)
from ropa.infrastructure.repositories.django_repository import (
    DjangoCompraRepository,
    DjangoProductoRepository,
)
from ropa.api.serializers import CompraSerializer, ProductoSerializer


producto_repository = DjangoProductoRepository()
compra_repository = DjangoCompraRepository()


class ProductoListCreateView(APIView):
    def get(self, request):
        productos = ListarProductos(producto_repository).ejecutar()
        return Response({"datos": ProductoSerializer(productos, many=True).data})

    def post(self, request):
        serializer = ProductoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            producto = CrearProducto(producto_repository).ejecutar(serializer.validated_data)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"operacion": "CREATE", "datos": ProductoSerializer(producto).data},
            status=status.HTTP_201_CREATED,
        )


class ProductoDetailView(APIView):
    def get(self, request, pk):
        try:
            producto = ObtenerProducto(producto_repository).ejecutar(pk)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_404_NOT_FOUND)
        return Response(ProductoSerializer(producto).data)

    def put(self, request, pk):
        serializer = ProductoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            producto = ActualizarProducto(producto_repository).ejecutar(pk, serializer.validated_data)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"operacion": "UPDATE", "datos": ProductoSerializer(producto).data}
        )

    def delete(self, request, pk):
        try:
            EliminarProducto(producto_repository).ejecutar(pk)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"operacion": "DELETE"})


class CompraListCreateView(APIView):
    def get(self, request):
        compras = ListarCompras(compra_repository).ejecutar()
        return Response({"datos": CompraSerializer(compras, many=True).data})

    def post(self, request):
        datos = request.data.copy()
        try:
            compra = CrearCompra(compra_repository, producto_repository).ejecutar(datos)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"operacion": "CREATE", "datos": CompraSerializer(compra).data},
            status=status.HTTP_201_CREATED,
        )


class CompraDetailView(APIView):
    def get(self, request, pk):
        try:
            compra = ObtenerCompra(compra_repository).ejecutar(pk)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_404_NOT_FOUND)
        return Response(CompraSerializer(compra).data)

    def put(self, request, pk):
        datos = request.data.copy()
        try:
            compra = ActualizarCompra(compra_repository, producto_repository).ejecutar(pk, datos)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"operacion": "UPDATE", "datos": CompraSerializer(compra).data}
        )

    def delete(self, request, pk):
        try:
            EliminarCompra(compra_repository).ejecutar(pk)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"operacion": "DELETE"})
