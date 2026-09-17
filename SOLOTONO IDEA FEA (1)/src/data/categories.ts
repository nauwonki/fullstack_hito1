import { CategoryTree } from '../types';

export const categoriesData: CategoryTree[] = [
  {
    id: 'cat-cuerda',
    nombre: 'Cuerda',
    slug: 'cuerda',
    icono: 'Guitar',
    subcategorias: [
      {
        id: 'sub-guitarra',
        nombre: 'Guitarra',
        slug: 'guitarra',
        tipos: [
          { id: 'tipo-acustica', nombre: 'Acústica', slug: 'acustica' },
          { id: 'tipo-electrica', nombre: 'Eléctrica', slug: 'electrica' },
          { id: 'tipo-clasica', nombre: 'Clásica', slug: 'clasica' },
        ],
      },
      {
        id: 'sub-bajo',
        nombre: 'Bajo',
        slug: 'bajo',
        tipos: [
          { id: 'tipo-bajo-electrico', nombre: 'Eléctrico', slug: 'electrico' },
          { id: 'tipo-bajo-acustico', nombre: 'Acústico', slug: 'acustico' },
        ],
      },
      {
        id: 'sub-frotada',
        nombre: 'Instrumentos de Arco',
        slug: 'arco',
        tipos: [
          { id: 'tipo-violin', nombre: 'Violín', slug: 'violin' },
          { id: 'tipo-viola', nombre: 'Viola', slug: 'viola' },
          { id: 'tipo-cello', nombre: 'Cello', slug: 'cello' },
        ],
      },
    ],
  },
  {
    id: 'cat-aire',
    nombre: 'Aire',
    slug: 'aire',
    icono: 'Wind',
    subcategorias: [
      {
        id: 'sub-viento-madera',
        nombre: 'Viento madera',
        slug: 'viento-madera',
        tipos: [
          { id: 'tipo-flauta', nombre: 'Flauta', slug: 'flauta' },
          { id: 'tipo-clarinete', nombre: 'Clarinete', slug: 'clarinete' },
          { id: 'tipo-saxofon', nombre: 'Saxofón', slug: 'saxofon' },
        ],
      },
      {
        id: 'sub-viento-metal',
        nombre: 'Viento metal',
        slug: 'viento-metal',
        tipos: [
          { id: 'tipo-trompeta', nombre: 'Trompeta', slug: 'trompeta' },
          { id: 'tipo-trombon', nombre: 'Trombón', slug: 'trombon' },
          { id: 'tipo-tuba', nombre: 'Tuba', slug: 'tuba' },
        ],
      },
    ],
  },
  {
    id: 'cat-percusion',
    nombre: 'Percusión',
    slug: 'percusion',
    icono: 'Drum',
    subcategorias: [
      {
        id: 'sub-bateria',
        nombre: 'Batería',
        slug: 'bateria',
        tipos: [
          { id: 'tipo-bateria-acustica', nombre: 'Acústica', slug: 'acustica' },
          { id: 'tipo-bateria-electrica', nombre: 'Eléctrica', slug: 'electrica' },
        ],
      },
      {
        id: 'sub-latinos',
        nombre: 'Latinos / Folclore',
        slug: 'latinos',
        tipos: [
          { id: 'tipo-congas', nombre: 'Congas', slug: 'congas' },
          { id: 'tipo-bongo', nombre: 'Bongó', slug: 'bongo' },
          { id: 'tipo-djembe', nombre: 'Djembe', slug: 'djembe' },
        ],
      },
    ],
  },
];
