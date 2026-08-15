// BIBLIOTECAS EXTERNAS
import { useEffect, useState, useCallback } from 'react';
import { BsPinMapFill, BsFillClockFill, BsChevronDown } from "react-icons/bs";
import { Squash as Hamburger } from 'hamburger-react';

// HOOKS
import { useStickyNavbar } from '../../hooks/useStickyNavbar';

// COMPONENTES
import Button from '../common/button';

// ESTILOS
import styles from './navbar.module.css';

// DATOS
import { navData } from '../../data/navigation';

const HAMBURGER_PROPS = {
    size: 28,
    color: "#26272B",
    duration: 0.4,
    rounded: true,
    label: "Toggle menu"
} as const;


const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    
    // Usamos el hook personalizado creado por el usuario
    const { scrollState } = useStickyNavbar(isMenuOpen);

    // ==================== SCROLL LOCK ====================
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            if (typeof window !== 'undefined' && window.lenis) window.lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (typeof window !== 'undefined' && window.lenis) window.lenis.start();
        }
        return () => {
            document.body.style.overflow = '';
            if (typeof window !== 'undefined' && window.lenis) window.lenis.start();
        };
    }, [isMenuOpen]);

    // ==================== HANDLERS ====================
    const toggleAccordion = (section: string) => {
        setOpenAccordion(prev => prev === section ? null : section);
    };

    const handleCloseMenu = useCallback(() => {
        setMenuOpen(false);
        setOpenAccordion(null);
    }, []);

    // Renderizar item de navegación
    const renderNavItem = useCallback((item: { label: string; link: string }) => {
        return (
            <a href={item.link} onClick={handleCloseMenu}>
                {item.label}
            </a>
        );
    }, [handleCloseMenu]);

    // Determinar la clase de scroll
    let scrollClass = '';
    if (scrollState === 'scroll-down') scrollClass = styles.hide;
    if (scrollState === 'scroll-up') scrollClass = styles.showNavOnly;

    return (
        <>
            {/* Desktop Overlay - Fuera del header para correcto z-index stacking */}
            <div
                className={`${styles.desktopOverlay} ${isMenuOpen ? styles.active : ''}`}
                onClick={handleCloseMenu}
            ></div>

            
            {/* ==================== HAMBURGER ICON (CAPA 1) ==================== */}
            <div className={`${styles.hamburgerFixed} ${scrollClass}`}>
                <Hamburger toggled={isMenuOpen} toggle={setMenuOpen} {...HAMBURGER_PROPS} />
            </div>

            {/* ==================== HEADER WRAPPER ==================== */}
            <header className={`${styles.siteHeader} ${scrollClass} ${isMenuOpen ? styles.menuOpen : ''}`}>

                {/* TOP BAR */}
                <div className={styles.topNav}>
                    <div className={styles.topNavInner}>
                        <div className={styles.topNavItem}>
                            <BsFillClockFill />
                            <span>Lunes - Sábado | 08:00 - 18:00</span>
                        </div>
                        <div className={styles.topNavItem}>
                            <a
                                href="https://maps.app.goo.gl/o9mERAochVnBAPxMA"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <BsPinMapFill />
                                Av. Carlos Izaguirre Mza. B Lote. 05 15109 - SMP
                            </a>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <hr className={styles.divider} />

                {/* MAIN NAV */}
                <nav className={styles.mainNav}>
                    <div className={styles.mainNavInner}>
                        {/* Logo */}
                        <a href="/" className={styles.logoLink}>
                            <img
                                src="/logo.svg"
                                alt="Idelsi Soluciones"
                                className={styles.logo}
                                width="715"
                                height="409"
                            />
                        </a>

                        {/* Actions container: Hamburger + CTA */}
                        <div className={styles.navActions}>
                            {/* Hamburger button (Desktop) */}
                            <div className={styles.hamburgerDesktop}>
                                <Hamburger toggled={isMenuOpen} toggle={setMenuOpen} {...HAMBURGER_PROPS} />
                            </div>


                            {/* CTA Button - siempre visible en desktop */}
                            <Button variant="secondary"
                                href="/contacto"
                                className={styles.ctaButton}
                                onClick={handleCloseMenu}
                            >
                                Cotiza ahora
                            </Button>
                        </div>
                    </div>
                </nav>

                {/* ==================== MEGA DROPDOWN - DESKTOP ==================== */}
                <div className={`${styles.megaDropdown} ${isMenuOpen ? styles.open : ''}`}>
                    <div className={styles.megaDropdownContent}>
                        {/* Columna Inicio */}
                        <div className={styles.megaColumn}>
                            <span className={styles.columnTitle}>{navData.inicio.title}</span>
                            <ul className={styles.columnLinks}>
                                {navData.inicio.items.map((item, index) => (
                                    <li key={index}>{renderNavItem(item)}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Columna Servicios */}
                        <div className={styles.megaColumn}>
                            <span className={styles.columnTitle}>{navData.servicios.title}</span>
                            <ul className={styles.columnLinks}>
                                {navData.servicios.items.map((item, index) => (
                                    <li key={index}>{renderNavItem(item)}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Columna Productos */}
                        <div className={styles.megaColumn}>
                            <span className={styles.columnTitle}>{navData.productos.title}</span>
                            <ul className={styles.columnLinks}>
                                {navData.productos.items.map((item, index) => (
                                    <li key={index}>{renderNavItem(item)}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Columna Nosotros */}
                        <div className={styles.megaColumn}>
                            <span className={styles.columnTitle}>{navData.nosotros.title}</span>
                            <ul className={styles.columnLinks}>
                                {navData.nosotros.items.map((item, index) => (
                                    <li key={index}>{renderNavItem(item)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            {/* ==================== MOBILE MENU - FULLSCREEN ACCORDION ==================== */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                <div className={styles.mobileMenuContent}>
                    {/* Inicio */}
                    <a href="/" className={styles.mobileMenuItem} onClick={handleCloseMenu}>
                        Inicio
                    </a>

                    {/* Servicios Accordion */}
                    <div className={styles.accordionItem}>
                        <button
                            className={`${styles.accordionHeader} ${openAccordion === 'servicios' ? styles.active : ''}`}
                            onClick={() => toggleAccordion('servicios')}
                        >
                            <span>Servicios</span>
                            <BsChevronDown className={styles.accordionIcon} />
                        </button>
                        <div className={`${styles.accordionContent} ${openAccordion === 'servicios' ? styles.open : ''}`}>
                            {navData.servicios.items.map((item, index) => (
                                <div key={index} className={styles.accordionLink}>
                                    {renderNavItem(item)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Productos Accordion */}
                    <div className={styles.accordionItem}>
                        <button
                            className={`${styles.accordionHeader} ${openAccordion === 'productos' ? styles.active : ''}`}
                            onClick={() => toggleAccordion('productos')}
                        >
                            <span>Productos</span>
                            <BsChevronDown className={styles.accordionIcon} />
                        </button>
                        <div className={`${styles.accordionContent} ${openAccordion === 'productos' ? styles.open : ''}`}>
                            {navData.productos.items.map((item, index) => (
                                <div key={index} className={styles.accordionLink}>
                                    {renderNavItem(item)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nosotros Accordion */}
                    <div className={styles.accordionItem}>
                        <button
                            className={`${styles.accordionHeader} ${openAccordion === 'nosotros' ? styles.active : ''}`}
                            onClick={() => toggleAccordion('nosotros')}
                        >
                            <span>Nosotros</span>
                            <BsChevronDown className={styles.accordionIcon} />
                        </button>
                        <div className={`${styles.accordionContent} ${openAccordion === 'nosotros' ? styles.open : ''}`}>
                            {navData.nosotros.items.map((item, index) => (
                                <div key={index} className={styles.accordionLink}>
                                    {renderNavItem(item)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button Mobile */}
                    <Button variant="secondary"
                        href="/contacto"
                        className={styles.ctaButtonMobile}
                        onClick={handleCloseMenu}
                    >
                        Cotiza ahora
                    </Button>
                </div>
            </div>

            {/* Overlay para cerrar el menú al hacer clic fuera (mobile) */}
            <div className={`${styles.overlay} ${isMenuOpen ? styles.active : ''}`} onClick={handleCloseMenu}></div>
        </>
    );
};

export default Navbar;
