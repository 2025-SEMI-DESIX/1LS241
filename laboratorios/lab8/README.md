# Lab 8

## Instalación

Instalar las dependencias:
```bash
pnpm install
```

Construir las imágenes de los contenedores:
```bash
docker compose build
```

## Ejecución

### Base de datos

Para ejecutar el proyecto, se debe ejecutar el siguiente comando en la raíz del proyecto:

```bash
docker compose up -d
```

Para detener el proyecto, se debe ejecutar el siguiente comando en la raíz del proyecto:

```bash
docker compose down
```

### API

Para ejecutar la API, se debe ejecutar el siguiente comando en la raíz del proyecto:

```bash
pnpm run dev
