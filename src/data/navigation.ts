// ==================== NAVIGATION DATA ====================
// Fuente única de datos para la navegación del sitio.
// Reutilizable en: Navbar, Footer, Sitemap, etc.

export interface NavItem {
    label: string;
    link: string;
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export interface NavData {
    inicio: NavSection;
    servicios: NavSection;
    productos: NavSection;
    nosotros: NavSection;
}

export const navData: NavData = {
    inicio: {
        title: 'Menú Principal',
        items: [
            { label: 'Inicio', link: '/' },
        ]
    },
    servicios: {
        title: 'Servicios',
        items: [
            { label: 'Mantenimiento', link: '#' },
            { label: 'Reparación', link: '#' },
            { label: 'Instalación', link: '#' },
        ]
    },
    productos: {
        title: 'Productos',
        items: [
            { label: 'Venta de Equipos', link: '#' },
            { label: 'Alquiler de Equipos', link: '#' },
            { label: 'Repuestos', link: '#' },
        ]
    },
    nosotros: {
        title: 'Nosotros',
        items: [
            { label: '¿Quiénes Somos?', link: '#' },
            { label: 'Misión y Visión', link: '#' },
            { label: 'Nuestros Clientes', link: '#' },
        ]
    }
};
