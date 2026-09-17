# Prompt para Agente IA — Frontend Cotizador de Instrumentos

## Contexto del proyecto

Necesito que crees **solo el frontend** (sin backend, sin APIs reales) de una aplicación web tipo **cotizador de precios de instrumentos musicales**. Todos los datos deben ser **placeholders/hardcodeados** en el propio frontend (arrays de objetos en JS/TS o JSON local). No te preocupes por persistencia, autenticación ni llamadas HTTP reales.

Trabaja directamente en mi PC en la carpeta que te indique. Antes de empezar, **pregúntame la ruta exacta** y el stack que prefieras usar (recomiéndame uno si no especifico).

---

## Stack sugerido

- **React + Vite + TypeScript** (o Vue 3 + Vite si lo prefieres, pero justifícalo)
- **TailwindCSS** para estilos
- **React Router** para navegación
- Sin backend. Los datos viven en `/src/data/*.ts` como mocks.

Si crees que otro stack encaja mejor, propónmelo antes de escribir código.

---

## Estructura de datos (modelo conceptual)

Debes modelar los datos así (nombres de campos pueden variar, pero respeta la jerarquía):
Categoría raíz (ej: "Cuerda", "Aire", "Percusión")
└── Subcategoría (ej: dentro de "Cuerda" → "Guitarra", "Bajo", "Violín")
└── Tipo (ej: dentro de "Guitarra" → "Acústica", "Eléctrica", "Clásica")
└── Instrumento (ej: "Guitarra Acústica Yamaha F310")
├── precio base
├── imagen (placeholder)
├── descripción
├── accesorios[] (cuerdas, correas, fundas, etc.)
└── ofertas[] (precios por tienda)


Ejemplo de árbol de categorías que debe existir como mock:

- **Cuerda**
  - Guitarra → Acústica, Eléctrica, Clásica
  - Bajo → Eléctrico, Acústico
  - Violín, Viola, Cello
- **Aire**
  - Viento madera → Flauta, Clarinete, Saxofón
  - Viento metal → Trompeta, Trombón, Tuba
- **Percusión**
  - Batería → Acústica, Eléctrica
  - Latinos → Congas, Bongó, Djembe

Cada instrumento (hoja del árbol) debe tener **accesorios/cuerdas asociados** (ej: una guitarra acústica tiene "cuerdas de nylon", "cuerdas de acero", "capo", "correa", "funda").

---

## Vistas requeridas

### 1. Home (`/`)
- Grid de **placeholders** (cards) con instrumentos destacados.
- Cada card: imagen placeholder, nombre, categoría, precio "desde $X".
- Al hacer click en una card → va a la vista de producto.
- Header con logo, buscador (no funcional, solo UI) y **menú hamburguesa**.

### 2. Menú hamburguesa (global, overlay lateral)
- Árbol completo de categorías navegable:
  - Categoría raíz → subcategoría → tipo → lista de instrumentos.
  - Debe permitir expandir/colapsar cada nivel.
- Al hacer click en un instrumento, navega a su vista de producto.
- Al hacer click en una categoría/tipo, navega a una vista de listado filtrado (puede ser la misma Home filtrada o una vista `/categoria/:slug`).

### 3. Vista de producto (`/producto/:id`)
Layout de **dos columnas**:

- **Columna izquierda (principal):**
  - Imagen grande (placeholder).
  - Nombre, categoría breadcrumb, descripción.
  - Sección de **accesorios/cuerdas relacionados** (cards pequeñas con precio).

- **Columna derecha (sidebar de cotización):**
  - Título: "Comparar precios".
  - Lista de **ofertas por tienda** con placeholders:
    - Nombre tienda (ej: "Tienda Música XYZ", "AudioCenter", "Instrumentos Pro")
    - Precio
    - Disponibilidad (en stock / agotado)
    - Botón "Ver oferta" (no funcional)
  - Precio más bajo destacado arriba.
  - Botón "Agregar a cotización" (solo UI, puede guardar en estado local o localStorage).

### 4. (Opcional pero deseable) Vista de cotización (`/cotizacion`)
- Lista de instrumentos que el usuario agregó.
- Suma total estimada.
- Botón "Exportar" (placeholder).

---

## Requisitos de UX/UI

- Diseño limpio, moderno, tipo e-commerce.
- Responsive (mobile-first). En mobile, el sidebar de ofertas se apila debajo.
- Estados de hover claros en cards y botones.
- Usa **placeholders de imágenes** (ej: `https://placehold.co/600x400` o similar, o un componente `<Placeholder />`).
- Loading states no son necesarios porque no hay fetch real, pero si quieres simularlos con `setTimeout`, bienvenido.

---

## Entregables

1. Proyecto inicializado y corriendo con `npm run dev`.
2. Estructura de carpetas clara:


src/
components/
pages/
data/ ← mocks
types/ ← tipos TS
hooks/
layouts/



3. Mocks en `/src/data/`:
- `categories.ts` (árbol completo)
- `instruments.ts` (al menos 10-15 instrumentos variados)
- `stores.ts` (tiendas + ofertas por instrumento)
- `accessories.ts`
4. README breve con: cómo correr, estructura, dónde editar mocks.

---

## Instrucciones para ti (agente)

1. **Antes de escribir código**, confírmame:
 Ocupa MUI 
2. Propón primero un **plan de archivos** y espera mi OK.
3. Luego crea el proyecto paso a paso, mostrando comandos ejecutados.
4. Al terminar, levanta el dev server y dime la URL.
5. Si algo del brief es ambiguo, **pregunta antes de inventar**.

---

**Empieza preguntándome la ruta y confirmando el stack.**


