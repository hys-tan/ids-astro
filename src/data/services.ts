// ==================== SERVICES DATA ====================
// Fuente única de datos para la sección de servicios.
// Reutilizable en: ServicesPrev, página de Servicios, Footer, etc.

// ICONOS
import { ICONS } from '../icons/icons';

// ASSETS
import imgMantenimiento from '../assets/img6.webp';
import imgReparacion from '../assets/img1.webp';
import imgInstalacion from '../assets/img7.webp';

export const serviciosData = [
    {
        id: 1,
        icon: ICONS.personGear,
        title: 'MANTENIMIENTO',
        subtitle: 'PREVENTIVO Y PREDICTIVO',
        description: 'Programas de mantenimiento para grupos electrógenos, motores eléctricos, bombas de agua y sistemas HVAC.',
        image: imgMantenimiento,
        link: '/mantenimiento'
    },
    {
        id: 2,
        icon: ICONS.settings,
        title: 'REPARACIÓN',
        subtitle: 'CORRECTIVA',
        description: 'Diagnóstico avanzado y reparación de emergencia para motores industriales y generadores.',
        image: imgReparacion,
        link: '/reparacion'
    },
    {
        id: 3,
        icon: ICONS.tool,
        title: 'INSTALACIÓN',
        subtitle: 'Y MONTAJE',
        description: 'Diseño, fabricación e instalación de tableros TTA, pozos a tierra y sistemas de respaldo.',
        image: imgInstalacion,
        link: '/instalacion'
    }
];
