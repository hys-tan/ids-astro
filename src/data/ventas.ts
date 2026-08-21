import type { ImageMetadata } from 'astro';

// Logos (using ImageMetadata for Astro compatibility)
import cumminsLogo from '../assets/brands/cumminsGE.svg';
import catLogo from '../assets/brands/catGE.svg';
import perkinsLogo from '../assets/brands/perkins.svg';
import volvoLogo from '../assets/brands/volvoGE.svg';
import doosanLogo from '../assets/brands/doosan.svg';
import yanmarLogo from '../assets/brands/yanmarGE.svg';
import hondaLogo from '../assets/brands/hondaGE.svg';

export interface BrandLogo {
    file: ImageMetadata;
    name: string;
}

export const BRAND_LOGOS: BrandLogo[] = [
    { file: cumminsLogo, name: 'Cummins' },
    { file: catLogo, name: 'Caterpillar' },
    { file: perkinsLogo, name: 'Perkins' },
    { file: volvoLogo, name: 'Volvo' },
    { file: doosanLogo, name: 'Doosan' },
    { file: yanmarLogo, name: 'Yanmar' },
    { file: hondaLogo, name: 'Honda' }
];

export const VENTAS_TEXTS = {
    title: {
        normal: "VENTA Y ALQUILER DE",
        highlight: "GRUPOS ELECTRÓGENOS"
    },
    description: "Contamos con una amplia flota de equipos para entrega inmediata, desde 10kVA hasta 2500kVA. Soluciones adaptadas para minería, construcción y eventos de gran escala.",
    buttons: {
        primary: {
            text: "Ver Catálogo de Venta",
            href: "/ventas"
        },
        secondary: {
            text: "Ver Catálogo de Alquiler",
            href: "#"
        }
    }
};
