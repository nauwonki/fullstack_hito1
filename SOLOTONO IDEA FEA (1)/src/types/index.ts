export interface Accessory {
  id: string;
  nombre: string;
  tipo: string;
  precio: number;
  imagen: string;
  descripcion?: string;
}

export interface StoreOffer {
  storeId: string;
  storeName: string;
  price: number;
  inStock: boolean;
  shipping: string;
  url: string;
  condition?: 'Nuevo' | 'Reacondicionado';
  destacada?: boolean;
}

export interface Store {
  id: string;
  name: string;
  rating: number;
  location: string;
}

export interface Instrument {
  id: string;
  nombre: string;
  marca: string;
  categoriaRaiz: string; // ej: "Cuerda"
  subcategoria: string;  // ej: "Guitarra"
  tipo: string;          // ej: "Acústica"
  precioBase: number;
  imagen: string;
  descripcion: string;
  accesorios: Accessory[];
  ofertas: StoreOffer[];
  especificaciones?: Record<string, string>;
}

export interface InstrumentTypeCategory {
  id: string;
  nombre: string;
  slug: string;
}

export interface SubCategory {
  id: string;
  nombre: string;
  slug: string;
  tipos: InstrumentTypeCategory[];
}

export interface CategoryTree {
  id: string;
  nombre: string;
  slug: string;
  icono?: string;
  subcategorias: SubCategory[];
}

export interface QuoteItem {
  id: string;
  instrumentId: string;
  instrumentNombre: string;
  instrumentImagen: string;
  storeName: string;
  storePrice: number;
  addedAt: string;
  accesoriosExtra?: Accessory[];
}
