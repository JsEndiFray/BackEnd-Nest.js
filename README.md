
# Proyecto Backend con NestJS, Sequelize y MySQL

Este proyecto es una aplicación backend construida con **NestJS**,  **Sequelize** y **MySQL**, diseñada para ser escalable, modular y eficiente. La base de datos utilizada es MySQL. El proyecto incluye autenticación mediante JWT, validaciones avanzadas y una estructura robusta para facilitar el desarrollo.

---

## Características principales

- Framework: **NestJS** con TypeScript.
- ORM: **Sequelize** con soporte para modelos tipados.
- Base de datos: **MySQL**.
- Autenticación: **JWT**.
- Validación de datos: **class-validator** y **class-transformer**.
- Configuración por entorno usando **dotenv**.

---

## Requisitos previos

1. **Node.js** (versión recomendada: 16+).
2. **NPM**
3. **MySQL** (configurado en el archivo `.env`).

---

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_de_la_base_de_datos
    JWT_SECRET=tu_clave_secreta
    ```
---

## Autenticación y Roles

### Rutas Públicas

Puedes marcar rutas como públicas usando el decorador `@Public`. Esto omite cualquier verificación de autenticación.

```typescript
import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/public.decorator';

@Controller('example')
export class ExampleController {
  @Public()
  @Get()
  getPublicData() {
    return { message: 'Esta ruta es pública' };
  }
}
```

### Rutas Protegidas

Las rutas protegidas requieren un token JWT válido. Esto se maneja automáticamente usando el guard `AuthGuard`.

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller('secure')
@UseGuards(AuthGuard)
export class SecureController {
  @Get()
  getProtectedData() {
    return { message: 'Solo accesible con un token válido' };
  }
}
```

### Uso de Roles

Usa el decorador `@Roles` para restringir el acceso según los roles definidos:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  @Roles('admin')
  @Get()
  getAdminData() {
    return { message: 'Solo accesible para administradores' };
  }
}
```

---

## Instalación

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Configurar el entorno: Copiar y modificar el archivo `.env`:

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


## Tecnologías Utilizadas

- **NestJS**
- **Sequelize**
- **JWT**
- **MySQL**
- **TypeScript**