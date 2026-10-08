from abc import ABC, abstractmethod
from typing import Any


class ProductoRepository(ABC):
    @abstractmethod
    def listar(self) -> list[Any]: ...

    @abstractmethod
    def obtener(self, producto_id: int) -> Any: ...

    @abstractmethod
    def crear(self, data: dict) -> Any: ...

    @abstractmethod
    def actualizar(self, producto_id: int, data: dict) -> Any: ...

    @abstractmethod
    def eliminar(self, producto_id: int) -> None: ...


class CompraRepository(ABC):
    @abstractmethod
    def listar(self) -> list[Any]: ...

    @abstractmethod
    def obtener(self, compra_id: int) -> Any: ...

    @abstractmethod
    def crear(self, data: dict) -> Any: ...

    @abstractmethod
    def actualizar(self, compra_id: int, data: dict) -> Any: ...

    @abstractmethod
    def eliminar(self, compra_id: int) -> None: ...
