# SOFT-12 - Tarea 3: Sistema Distribuido Maratón

Este repositorio contiene la implementación del sistema distribuido **Maratón** (compuesto por tres servidores y un cliente), desarrollado como parte del curso SOFT-12.


## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/verbrannt-bob/SOFT-12-Tarea3.git
   cd SOFT-12-Tarea3
   ```

2. Instala las dependencias necesarias del proyecto:
   ```bash
   # npm install
   # dotnet restore
   ```

---

## Guía de Ejecución

Para levantar el sistema completo, debes iniciar primero los **dos servidores**  y posteriormente ejecutar el **cliente del Maratón**.

### 1. Ejecutar los Servidores

#### Servidor 1: `[Servidor Express]`
Abre una primera terminal y ejecuta:
```bash
cd servidor
npm run dev
```

#### Servidor 2: `[Servidor .Net]`
Abre una segunda terminal y ejecuta:
```bash
cd servidor-net
dotnet run
```

### 2. Ejecutar el Cliente del Maratón

Una vez que los tres servidores estén activos y escuchando peticiones, abre una cuarta terminal para iniciar el cliente:

```bash
cd cliente
npm run dev
```

---

## Estructura del Repositorio

```text
SOFT-12-Tarea3/
├── maraton-series/               
|   ├── servidor/          # Código fuente del Servidor Express
|   ├── servidor-net/          # Código fuente del Servidor .Net
|   └── cliente/            # Código fuente del Cliente Maratón
└── README.md           # Documentación principal del proyecto
```

---

## Autor

* **Roberto González Castillo** - (https://github.com/verbrannt-bob)