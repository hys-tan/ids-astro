// BIBLIOTECAS EXTERNAS
import { useRef, useEffect } from 'react';
import { IoArrowForward } from 'react-icons/io5';

// ESTILOS
import styles from './servicesPrev.module.css';

// DATOS
import { serviciosData } from '../../data/services';

const INITIAL_SCALE = 0.8;
const FINAL_SCALE = 1.0;

const calculateCardScales = (grid: HTMLDivElement | null, cards: (HTMLDivElement | null)[]) => {
    if (!grid) return;

    const windowHeight = window.innerHeight;
    const rect = grid.getBoundingClientRect();

    // Progreso basado en el CONTENEDOR del grid, no en cada tarjeta individualmente.
    // Así todas las tarjetas comparten la misma escala en todo momento.
    let progress = (windowHeight - rect.top) / windowHeight;
    progress = Math.max(0, Math.min(1, progress));

    const newScale = INITIAL_SCALE + (progress * (FINAL_SCALE - INITIAL_SCALE));

    // Aplicar la misma escala a todas las tarjetas
    cards.forEach((card) => {
        if (!card) return;
        card.style.transform = `scale(${newScale})`;
    });
};

const ServicesPrev = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const ticking = useRef(false);

    // Throttle: solo ejecuta calculateCardScales una vez por frame de animación
    const onScroll = () => {
        if (ticking.current) return;
        ticking.current = true;
        requestAnimationFrame(() => {
            calculateCardScales(gridRef.current, cardRefs.current);
            ticking.current = false;
        });
    };

    useEffect(() => {
        calculateCardScales(gridRef.current, cardRefs.current);
        window.addEventListener('resize', onScroll, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('resize', onScroll);
            window.removeEventListener('scroll', onScroll);
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
