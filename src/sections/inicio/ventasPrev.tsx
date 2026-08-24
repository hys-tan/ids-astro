import styles from './ventasPrev.module.css';
import Button from '../../components/common/button';
import { BsPatchCheckFill } from 'react-icons/bs';

import productImage from '../../assets/prueba.webp';

// Datos de la sección directamente en el archivo
const VENTAS_TEXTS = {
    title: {
        normal: "VENTA Y ALQUILER DE ",
        highlight: "GRUPOS ELECTRÓGENOS"
    },
    description: "Contamos con una amplia flota de equipos para entrega inmediata, desde 10kVA hasta 2500kVA. Soluciones adaptadas para minería, construcción y eventos de gran escala.",
    buttons: {
        primary: { text: "VER CATÁLOGO DE VENTA", href: "#" },
        secondary: { text: "VER CATÁLOGO DE ALQUILER", href: "#" }
    }
};

const BRANDS = [
    "Caterpillar",
    "Cummins",
    "Honda",
    "Yanmar",
    "Perkins",
    "Volvo Penta",
    "Develon / Doosan"
];

const VentasPrev = () => {
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

                            <div className={styles.brandsGrid}>
                                {BRANDS.map((brand, index) => (
                                    <div key={index} className={styles.brandTextItem}>
                                        <BsPatchCheckFill className={styles.brandTextIcon} />
                                        <span>{brand}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VentasPrev;
