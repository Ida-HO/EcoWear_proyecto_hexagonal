from rest_framework import serializers

from ropa.infrastructure.models import CompraModel, ProductoModel


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoModel
        fields = ["id", "nombre", "precio"]


class CompraSerializer(serializers.ModelSerializer):
    # Mantiene el mismo formato anidado que usaba tu React anterior.
    cliente = serializers.SerializerMethodField()

    class Meta:
        model = CompraModel
        fields = [
            "_id",
            "id",
            "producto",
            "cliente",
            "items",
            "total",
            "estado",
            "fecha",
        ]
        read_only_fields = ["_id", "id", "total"]

    _id = serializers.IntegerField(source="id", read_only=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["producto"] = instance.producto_id
        data["total"] = float(instance.total)
        # El React antiguo usa productoId dentro de items.
        for item in data.get("items", []):
            if "productoId" in item:
                item["productoId"] = str(item["productoId"])
        return data

    def get_cliente(self, obj):
        return {
            "nombre": obj.cliente_nombre,
            "email": obj.cliente_email,
            "direccion": obj.cliente_direccion,
        }

    def validate_items(self, value):
        if not isinstance(value, list) or not value:
            raise serializers.ValidationError("Debe existir al menos un item")
        return value

    def validate(self, attrs):
        attrs["cliente"] = attrs.get("cliente", {})
        return attrs
