# SOLOTONO — Frontend Cotizador de Instrumentos Musicales

Aplicación web frontend (SPA) para cotizar y comparar precios de instrumentos musicales entre diversas tiendas especializadas en tiempo real. Construido con **React 19 + TypeScript + Vite + Material UI (MUI v6)** y mocks locales.

---

## 🚀 Cómo Correr el Proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible de inmediato en [http://localhost:5173](http://localhost:5173).

3. **Construir para producción (validación):**
   ```bash
   npm run build
   ```

---

## 🛠️ Botones de Navegación de Prueba (DEV Testing)

En la parte superior de la aplicación se encuentra un banner fijo de pruebas especialmente diseñado para desarrolladores y testeadores con:
- **`[ 🏠 IR A HOME ]`**: Navega instantáneamente al catálogo principal (`/`).
- **`[ 🎸 IR A PRODUCTO DE PRUEBA ]`**: Navega directamente a la ficha detallada de la **Guitarra Acústica Yamaha F310** (`/producto/yamaha-f310`), con tabla comparativa de 4 tiendas, especificaciones y accesorios.
- **`[ 📋 COTIZACIÓN ]`**: Acceso directo al resumen con totalizador y exportador.
- **`[ ⚙️ Switch Buscador: Filtro Activo / Mock ]`**: Interruptor para alternar entre filtrado en tiempo real reactivo sobre los datos locales o modo puramente estático/mock.

---

## 📁 Estructura del Proyecto

```
SOLOTONO IDEA FEA/
├── index.html                     # Entrada HTML con fuentes Inter y Outfit
├── package.json                   # Dependencias y scripts de ejecución
├── tsconfig.json                  # Configuración base de TypeScript
├── tsconfig.app.json              # Configuración TypeScript para React + Vite
├── vite.config.ts                 # Configuración de Vite
├── src/
│   ├── main.tsx                   # Punto de montaje React
│   ├── App.tsx                    # Enrutador BrowserRouter, tema MUI y layouts
│   ├── index.css                  # Estilos globales y reset
│   │
│   ├── types/
│   │   └── index.ts               # Interfaces TS (Instrument, Category, Store, Accessory, QuoteItem)
│   │
│   ├── theme/
│   │   └── theme.ts               # Tema oscuro MUI personalizado (#1cba5e como acento principal)
│   │
│   ├── data/                      # 📌 MOCKS DE DATOS LOCALES
│   │   ├── categories.ts          # Árbol jerárquico completo (Cuerda, Aire, Percusión)
│   │   ├── accessories.ts         # Mocks de accesorios, cuerdas y fundas
│   │   ├── stores.ts              # Tiendas especializadas con ratings y ubicaciones
│   │   └── instruments.ts         # Catálogo de 14+ instrumentos con ofertas por tienda
│   │
│   ├── context/
│   │   ├── QuoteContext.tsx       # Gestión de cotizaciones y persistencia en localStorage
│   │   └── DevSettingsContext.tsx # Flags de testing para desarrolladores (filtro buscador)
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── DemoNavBanner.tsx      # Barra superior de navegación rápida para pruebas
│   │   │   └── DevPlaceholderImage.tsx # Componente de imagen placeholder técnico para devs
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Header con logo, buscador y badge de cotización
│   │   │   ├── CategoryDrawer.tsx     # Menú lateral colapsable con árbol de categorías
│   │   │   └── Footer.tsx             # Pie de página
│   │   └── product/
│   │       ├── InstrumentCard.tsx     # Tarjeta de instrumento para la grilla
│   │       ├── StoreOffersList.tsx    # Sidebar comparador de precios por tienda
│   │       └── AccessoriesSection.tsx # Accesorios compatibles seleccionables
│   │
│   └── pages/
│       ├── HomePage.tsx           # Grilla principal con filtros y buscador
│       ├── ProductDetailPage.tsx  # Vista de producto (2 columnas: ficha + comparador)
│       └── QuotePage.tsx          # Resumen de cotización, total estimado y exportador
└── README.md
```

---

## ✏️ Dónde y Cómo Editar los Mocks

Todos los datos viven en la carpeta `/src/data/` en archivos TypeScript tipados:

1. **Editar o Agregar Categorías:**
   - Archivo: [`src/data/categories.ts`](file:///home/benjamin/Escritorio/SOLOTONO%20IDEA%20FEA/src/data/categories.ts)
   - Permite modificar el árbol conceptual de familias (`Cuerda`, `Aire`, `Percusión`), subcategorías (`Guitarra`, `Bajo`, `Batería`) y tipos (`Acústica`, `Eléctrica`, `Clásica`).

2. **Editar o Agregar Instrumentos:**
   - Archivo: [`src/data/instruments.ts`](file:///home/benjamin/Escritorio/SOLOTONO%20IDEA%20FEA/src/data/instruments.ts)
   - Cada instrumento cuenta con: `id`, `nombre`, `marca`, `categoriaRaiz`, `subcategoria`, `tipo`, `precioBase`, `descripcion`, `accesorios` vinculados, `ofertas` por tienda y `especificaciones`.

3. **Editar o Agregar Tiendas:**
   - Archivo: [`src/data/stores.ts`](file:///home/benjamin/Escritorio/SOLOTONO%20IDEA%20FEA/src/data/stores.ts)
   - Permite configurar los nombres de las tiendas (ej: *AudioCenter Pro*, *Tienda Música XYZ*, *Instrumentos Pro Chile*), valoraciones y ubicaciones.

4. **Editar o Agregar Accesorios y Cuerdas:**
   - Archivo: [`src/data/accessories.ts`](file:///home/benjamin/Escritorio/SOLOTONO%20IDEA%20FEA/src/data/accessories.ts)
   - Define cuerdas de nylon, cuerdas de acero, afinadores, capos, fundas y soportes con sus precios referenciales.

---

## 🧭 Vistas Implementadas

1. **Home (`/`)**:
   - Grid responsive de cards con precio "desde $X" y conteo de tiendas analizadas.
   - Filtros rápidos por familia y buscador con interruptor de testeo.
   - Header con logo y botón para desplegar el árbol de categorías.

2. **Menú Lateral Hamburguesa (Drawer Global)**:
   - Árbol multinivel desplegable con contadores de instrumentos.
   - Permite filtrar la Home por cualquier nivel o saltar directamente a un instrumento específico.

3. **Ficha de Producto (`/producto/:id`)**:
   - **Columna izquierda:** Imagen dev placeholder grande, breadcrumbs, descripción, especificaciones técnicas y accesorios relacionados seleccionables.
   - **Columna derecha (Sidebar de cotización):** Título "Comparar precios", mejor oferta destacada con tag verde, lista de tiendas con estado de stock, botón "Ver oferta" y botón "Agregar a cotización".

4. **Cotización (`/cotizacion`)**:
   - Resumen interactivo de instrumentos y accesorios agregados con persistencia en `localStorage`.
   - Cálculo automático de suma total estimada.
   - Acciones para exportar a archivo JSON o copiar resumen al portapapeles.
