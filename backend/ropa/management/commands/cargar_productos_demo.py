from django.core.management.base import BaseCommand

from ropa.infrastructure.models import ProductoModel


class Command(BaseCommand):
    help = "Crea productos de prueba para EcoWear"

    def handle(self, *args, **options):
        productos = [
            {"nombre": "Polera Organica", "precio": 15990},
            {"nombre": "Poleron Reciclado", "precio": 29990},
            {"nombre": "Pantalon Denim Eco", "precio": 39990},
        ]
        creados = 0
        for datos in productos:
            _, creado = ProductoModel.objects.get_or_create(
                nombre=datos["nombre"],
                defaults={"precio": datos["precio"]},
            )
            creados += int(creado)
        self.stdout.write(self.style.SUCCESS(f"Productos demo creados: {creados}"))
