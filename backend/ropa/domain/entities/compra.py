from dataclasses import dataclass
from datetime import date
from decimal import Decimal
from typing import Any


@dataclass(frozen=True)
class Compra:
    """Entidad de dominio pura. No depende de Django."""

    id: int | None
    producto_id: int
    cliente_nombre: str
    cliente_email: str
    cliente_direccion: str
    items: list[dict[str, Any]]
    total: Decimal
    estado: str
    fecha: date

    def __post_init__(self):
        if not self.cliente_nombre.strip():
            raise ValueError("El nombre del cliente es obligatorio")
        if not self.cliente_email.strip():
            raise ValueError("El email del cliente es obligatorio")
        if not self.items:
            raise ValueError("La compra debe tener al menos un item")
        if self.total < 0:
            raise ValueError("El total no puede ser negativo")
