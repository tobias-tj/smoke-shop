# VapeStore E-Commerce Template

Este proyecto es una plantilla moderna y completa para la creación de una tienda virtual, pensada inicialmente para un e-commerce de **vapes**, pero totalmente adaptable a cualquier tipo de negocio. La finalidad de este repositorio es ofrecer una base sólida, profesional y escalable para construir una plataforma de ventas online con todas las herramientas más actuales del ecosistema web.

Incluye un panel administrativo avanzado, manejo de stock, visualización de métricas, gestión de productos, procesamiento de pagos y mucho más.

---

## 🚀 Tecnologías Utilizadas

- **Next.js** – Framework de React para renderizado híbrido (SSR/SSG) y performance optimizada.
- **Prisma** – ORM moderno para interactuar con bases de datos mediante TypeScript.
- **NeonDB** – Base de datos PostgreSQL serverless, rápida y escalable.
- **Uploadthing** – Servicio para subida y gestión de archivos.
- **Stripe** – Plataforma segura para pagos y procesamiento de compras.
- **Clerk Authentication** – Sistema de autenticación moderno para control de sesiones.
- **TailwindCSS** – Framework CSS para estilos rápidos y responsivos.

---

## 📦 Características del Proyecto

- 🛒 **Catálogo de productos** totalmente dinámico  
- ❤️ **Gestión de productos favoritos**  
- 📦 **Panel administrativo** con:
  - Editor y creador de productos
  - Control de stock
  - Manejo de compras
  - Gráficos de ventas y métricas clave
  - Productos más vendidos / menos vendidos  
- 🔐 **Autenticación para usuarios y administradores**
- 💳 **Pagos con Stripe**
- ☁️ **Almacenamiento seguro de imágenes**
- 🧩 Arquitectura moderna, limpia y escalable

---

## ⚙️ Configuración del Entorno

Para ejecutar este proyecto, crea un archivo `.env` en la raíz del repositorio con las siguientes variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=sk_
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Prisma
DATABASE_URL=""

# Uploadthing
UPLOADTHING_TOKEN=""
UPLOADTHING_APP_ID=""

# Stripe
STRIPE_API_KEY=""

# URL del frontend
NEXT_PUBLIC_FRONTED_STORE_URL="http://localhost:3000"