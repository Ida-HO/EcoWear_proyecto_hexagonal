# Generated manually for the EcoWear evaluation backend.
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ProductoModel",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=150)),
                ("precio", models.DecimalField(decimal_places=2, max_digits=12)),
            ],
            options={"db_table": "productos", "ordering": ["id"]},
        ),
        migrations.CreateModel(
            name="CompraModel",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("cliente_nombre", models.CharField(max_length=150)),
                ("cliente_email", models.EmailField(max_length=254)),
                ("cliente_direccion", models.CharField(max_length=250)),
                ("items", models.JSONField(default=list)),
                ("total", models.DecimalField(decimal_places=2, max_digits=12)),
                ("estado", models.CharField(default="pendiente", max_length=50)),
                ("fecha", models.DateField()),
                ("producto", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="compras", to="ropa.productomodel")),
            ],
            options={"db_table": "compras", "ordering": ["-id"]},
        ),
    ]
