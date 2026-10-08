from dataclasses import dataclass
from decimal import Decimal


@dataclass(frozen=True)
class Producto:
    """Entidad de dominio pura. No depende de Django."""

    id: int | None
    nombre: str
    precio: Decimal

    def __post_init__(self):
        if not self.nombre or not self.nombre.strip():
            raise ValueError("El nombre del producto es obligatorio")
        if self.precio <= 0:
            raise ValueError("El precio debe ser mayor que 0")
