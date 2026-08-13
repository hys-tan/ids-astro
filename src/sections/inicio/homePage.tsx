import styles from './homePage.module.css';
import Button from '../../components/common/button';

const HomePage = () => {

    return (
        <section className={styles.heroContainer}>
            {/* Imagen de fondo decorativa */}
            <div className={styles.backgroundImage}></div>

            {/* Contenido del Hero */}
            <div className={styles.contentWrapper}>
                {/* Badge */}
                <span className={styles.badge}>EXPERTOS EN ENERGÍA</span>

                {/* Título principal */}
                <h1 className={styles.title}>
                    POTENCIA ININTERRUMPIDA
                    <span className={styles.titleAccent}> PARA TU INDUSTRIA</span>
                </h1>

                {/* Descripción */}
                <p className={styles.description}>
                    Suministramos soluciones integrales en grupos electrógenos, mantenimiento preventivo y repuestos originales para garantizar la continuidad de sus operaciones.
                </p>

                {/* Botones CTA */}
                <div className={styles.ctaContainer}>
                    <Button variant='primary' href="#servicios">
                        EXPLORAR SOLUCIONES
                    </Button>

                    <Button variant='secondary' href="#">
                        QUIÉNES SOMOS
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
