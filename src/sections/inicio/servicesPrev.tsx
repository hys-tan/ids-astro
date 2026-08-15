// BIBLIOTECAS EXTERNAS
import { useRef, useEffect } from 'react';
import { IoArrowForward } from 'react-icons/io5';
import { MdManageAccounts, MdSettings, MdConstruction } from 'react-icons/md';

// ASSETS
import imgMantenimiento from '../../assets/img6.webp';
import imgReparacion from '../../assets/img1.webp';
import imgInstalacion from '../../assets/img7.webp';

// ESTILOS
import styles from './servicesPrev.module.css';

const serviciosData = [
    {
        id: 1,
        icon: MdManageAccounts,
        title: 'MANTENIMIENTO',
        subtitle: 'PREVENTIVO Y PREDICTIVO',
        description: 'Programas de mantenimiento para grupos electrógenos, motores eléctricos, bombas de agua y sistemas HVAC.',
        image: imgMantenimiento,
        link: '/mantenimiento'
    },
    {
        id: 2,
        icon: MdSettings,
        title: 'REPARACIÓN',
        subtitle: 'CORRECTIVA',
        description: 'Diagnóstico avanzado y reparación de emergencia para motores industriales y generadores.',
        image: imgReparacion,
        link: '/reparacion'
    },
    {
        id: 3,
        icon: MdConstruction,
        title: 'INSTALACIÓN',
        subtitle: 'Y MONTAJE',
        description: 'Diseño, fabricación e instalación de tableros TTA, pozos a tierra y sistemas de respaldo.',
        image: imgInstalacion,
        link: '/instalacion'
    }
];

const INITIAL_SCALE = 0.8;
const FINAL_SCALE = 1.0;

const ServicesPrev = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const calculateCardScales = () => {
        const grid = gridRef.current;
        if (!grid) return;

        const windowHeight = window.innerHeight;
        const rect = grid.getBoundingClientRect();

        // Progreso basado en el CONTENEDOR del grid, no en cada tarjeta individualmente.
        // Así todas las tarjetas comparten la misma escala en todo momento.
        let progress = (windowHeight - rect.top) / windowHeight;
        progress = Math.max(0, Math.min(1, progress));

        const newScale = INITIAL_SCALE + (progress * (FINAL_SCALE - INITIAL_SCALE));

        // Aplicar la misma escala a todas las tarjetas
        cardRefs.current.forEach((card) => {
            if (!card) return;
            card.style.transform = `scale(${newScale})`;
        });
    };

    
    useEffect(() => {
        calculateCardScales();
        window.addEventListener('resize', calculateCardScales, { passive: true });
        window.addEventListener('scroll', calculateCardScales, { passive: true });
        return () => {
            window.removeEventListener('resize', calculateCardScales);
            window.removeEventListener('scroll', calculateCardScales);
        };
    }, []);

    return (
        <section id="servicios" className={styles.servicesContainer}>
            {/* Hidden h2 for accessibility */}
            <h2 className={styles.visuallyHidden}>Nuestros Servicios</h2>

            {/* Cards Grid */}
            <div ref={gridRef} className={styles.cardsGrid}>
                {serviciosData.map((servicio, index) => (
                    <div
                        key={servicio.id}
                        ref={(el) => { cardRefs.current[index] = el; }}
                        className={styles.card}
                    >
                        {/* Background Image */}
                        <img
                            src={servicio.image.src}
                            alt={servicio.title}
                            className={styles.cardImage}
                            loading="lazy"
                            decoding='async'
                            width="650"
                            height="920"
                        />

                        {/* Overlay */}
                        <div className={styles.cardOverlay}></div>

                        {/* Content */}
                        <div className={styles.cardContent}>
                            {/* Icon */}
                            <servicio.icon className={styles.cardIcon} />

                            {/* Title */}
                            <h3 className={styles.cardTitle}>
                                {servicio.title}
                                <span className={styles.cardSubtitle}>{servicio.subtitle}</span>
                            </h3>

                            {/* Description (hidden by default, shows on hover) */}
                            <p className={styles.cardDescription}>
                                {servicio.description}
                            </p>

                            {/* CTA - Solo este es clickeable */}
                            <a href={servicio.link} className={styles.cardCta}>
                                VER DETALLES
                                <IoArrowForward className={styles.ctaArrow} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesPrev;
