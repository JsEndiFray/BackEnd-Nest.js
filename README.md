
# Proyecto Backend con NestJS y Sequelize

Este proyecto es una aplicación backend construida con **NestJS** y **Sequelize**, diseñada para ser escalable, modular y eficiente. La base de datos utilizada es MySQL. El proyecto incluye autenticación mediante JWT, validaciones avanzadas y una estructura robusta para facilitar el desarrollo.

---

## Características principales

- Framework: **NestJS** con TypeScript.
- ORM: **Sequelize** con soporte para modelos tipados.
- Base de datos: **MySQL**.
- Autenticación: **JWT**.
- Validación de datos: **class-validator** y **class-transformer**.
- Configuración por entorno usando **dotenv**.
- Límite de peticiones con **@nestjs/throttler**.

---

## Requisitos previos

1. **Node.js** (versión recomendada: 16+).
2. **NPM** o **Yarn**.
3. **MySQL** (configurado en el archivo `.env`).

---

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone <URL_REPOSITORIO>
   cd Backnestmysql
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Configurar el entorno: Copiar y modificar el archivo `.env`:

   ```bash
   cp .env.example .env
   ```

   Configurar las variables como `DB_HOST`, `DB_USER`, `DB_PASSWORD`, etc.

---

## Scripts disponibles

### Desarrollar:

- Iniciar el servidor en modo desarrollo:

  ```bash
  npm run start:dev
  ```

- Iniciar el servidor en modo producción:

  ```bash
  npm run start:prod
  ```

### Construcción:

- Compilar el proyecto para producción:

  ```bash
  npm run build
  ```

### Pruebas:

- Ejecutar pruebas unitarias:

  ```bash
  npm run test
  ```

- Ejecutar pruebas E2E:

  ```bash
  npm run test:e2e
  ```

- Generar un informe de cobertura:

  ```bash
  npm run test:cov
  ```

---

## Estructura del Proyecto

```
Backnestmysql/
├── src/
│   ├── main.ts        # Punto de entrada de la aplicación
│   ├── app.module.ts  # Módulo principal
│   ├── modules/       # Módulos organizados por funcionalidad
│   ├── controllers/   # Controladores para manejar rutas
│   ├── services/      # Lógica de negocio y servicios
│   └── utils/         # Utilidades y funciones comunes
├── models/            # Modelos Sequelize
├── config/            # Configuraciones de la aplicación
├── test/              # Pruebas unitarias y de integración
├── dist/              # Archivos compilados
├── .env               # Configuración de entorno
└── package.json       # Dependencias y scripts
```

---

## Dependencias Clave

### Producción

- **@nestjs/core**, **@nestjs/common**, **@nestjs/sequelize**: Framework NestJS y soporte Sequelize.
- **sequelize**, **sequelize-typescript**: ORM para MySQL.
- **bcrypt**: Encriptación de contraseñas.
- **passport-jwt**: Autenticación con JWT.

### Desarrollo

- **typescript**: Soporte para TypeScript.
- **jest**, **supertest**: Framework de pruebas.
- **eslint**, **prettier**: Formateo y linting del código.
---