import styles from './ventasPrev.module.css';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../../components/common/button';
import LogoCarousel from '../../components/ui/logoCarousel';

import productImage from '../../assets/prueba.webp';
import { BRAND_LOGOS, VENTAS_TEXTS } from '../../data/ventas';

const VentasPrev = () => {
    const isAnimated = useReducedMotion();

    return (
        <section className={styles.container}>
            <div className={styles.mainContent}>
                {/* Lado Izquierdo: Imagen */}
                <div className={styles.imageContainer}>
                    <img
                        src={productImage.src}
                        alt="Grupo Electrógeno"
                        className={styles.productImage}
                        loading="lazy"
                        decoding="async"
                        width="650"
                        height="560"
                    />
                </div>

                {/* Lado Derecho: Contenido */}
                <div className={styles.textContainer}>
                    <div className={styles.contentWrapper}>
                        {/* Bloque de Información Superior */}
                        <div className={styles.infoBlock}>
                            <h2 className={styles.title}>
                                {VENTAS_TEXTS.title.normal}
                                <span className={styles.highlight}>{VENTAS_TEXTS.title.highlight}</span>
                            </h2>

                            <p className={styles.description}>
                                {VENTAS_TEXTS.description}
                            </p>

                            <div className={styles.buttonContainer}>
                                <Button variant="primary" href={VENTAS_TEXTS.buttons.primary.href}>
                                    {VENTAS_TEXTS.buttons.primary.text}
                                </Button>
                                <Button variant="secondary" href={VENTAS_TEXTS.buttons.secondary.href}>
                                    {VENTAS_TEXTS.buttons.secondary.text}
                                </Button>
                            </div>
                        </div>

                        {/* Bloque de Marcas Inferior */}
                        <div className={styles.brandsBlock}>
                            <div className={styles.brandsHeader}>
                                <span className={styles.brandsTitle}>MARCAS DISPONIBLES</span>
                                <div className={styles.divider}></div>
                            </div>

                            <LogoCarousel logos={BRAND_LOGOS} isAnimated={isAnimated} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VentasPrev;
