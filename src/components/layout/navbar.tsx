// BIBLIOTECAS EXTERNAS
import { useEffect, useState, useCallback, useRef } from 'react';
import { Icon } from '@iconify/react';
import { ICONS } from '../../icons/icons';
import { Squash as Hamburger } from 'hamburger-react';

// HOOKS
import { useStickyNavbar } from '../../hooks/useStickyNavbar';

// COMPONENTES
import Button from '../common/button';

// ESTILOS
import styles from './navbar.module.css';

// DATOS
import { navData } from '../../data/navigation';
import { navigate } from 'astro:transitions/client';

const HAMBURGER_PROPS = {
    size: 28,
    color: "#26272B",
    duration: 0.4,
    rounded: true,
    label: "Toggle menu"
} as const;

// Tiempos de espera adaptables según el breakpoint de la media query
const DESKTOP_CLOSE_DURATION = 610; // 620 ms (> 1100px)
const MOBILE_CLOSE_DURATION = 410;  // 420 ms (<= 1100px)

const getCloseDuration = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1100) {
        return MOBILE_CLOSE_DURATION;
    }
    return DESKTOP_CLOSE_DURATION;
};

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const [noTransition, setNoTransition] = useState(false);

    // Apagar transiciones durante el swap de página para evitar parpadeos o movimientos
    useEffect(() => {
        const handleBeforeSwap = () => {
            setNoTransition(true);
        };

        const handlePageLoad = () => {
            // Restaurar transiciones en el siguiente frame cuando la página ya está en posición
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setNoTransition(false);
                });
            });
        };

        document.addEventListener('astro:before-swap', handleBeforeSwap);
        document.addEventListener('astro:page-load', handlePageLoad);

        return () => {
            document.removeEventListener('astro:before-swap', handleBeforeSwap);
            document.removeEventListener('astro:page-load', handlePageLoad);
        };
    }, []);
    
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

    // Referencia para cancelar timeout de navegación si se desmonta
    const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        };
    }, []);

    // ==================== HANDLERS ====================
    const toggleAccordion = (section: string) => {
        setOpenAccordion(prev => prev === section ? null : section);
    };

    const handleCloseMenu = useCallback(() => {
        setMenuOpen(false);
        const duration = getCloseDuration();
        // Reset accordion después de que el menú termine de cerrarse para evitar saltos
        setTimeout(() => {
            setOpenAccordion(null);
        }, duration);
    }, []);

    // Manejar clics de navegación con cierre animado antes de cambiar de página
    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Permitir que Ctrl+click / Cmd+click abra en nueva pestaña normalmente
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
            return;
        }

        if (!href || href === '#') {
            e.preventDefault();
            handleCloseMenu();
            return;
        }

        // Si ya estamos en la misma página, solo cerramos el menú sin navegar
        if (typeof window !== 'undefined' && window.location.pathname === href) {
            e.preventDefault();
            handleCloseMenu();
            return;
        }

        // Si el menú está abierto (desktop o mobile), esperamos a que termine la animación de cierre
        if (isMenuOpen) {
            e.preventDefault();
            const duration = getCloseDuration();
            handleCloseMenu();

            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
            navTimeoutRef.current = setTimeout(() => {
                navigate(href);
            }, duration);
        }
    }, [isMenuOpen, handleCloseMenu]);

    // Renderizar item de navegación
    const renderNavItem = useCallback((item: { label: string; link: string }) => {
        return (
            <a href={item.link} onClick={(e) => handleNavClick(e, item.link)}>
                {item.label}
            </a>
        );
    }, [handleNavClick]);

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
            <header className={`${styles.siteHeader} ${scrollClass} ${isMenuOpen ? styles.menuOpen : ''} ${noTransition ? styles.noTransition : ''}`}>

                {/* TOP BAR */}
                <div className={styles.topNav}>
                    <div className={styles.topNavInner}>
                        <div className={styles.topNavItem}>
                            <Icon icon={ICONS.clock} />
                            <span>Lunes - Sábado | 08:00 - 18:00</span>
                        </div>
                        <div className={styles.topNavItem}>
                            <a
                                href="https://maps.app.goo.gl/o9mERAochVnBAPxMA"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon icon={ICONS.mapPin} />
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
                        <a href="/" className={styles.logoLink} onClick={(e) => handleNavClick(e, '/')}>
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
                                onClick={(e: any) => handleNavClick(e, '/contacto')}
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
                    <a href="/" className={styles.mobileMenuItem} onClick={(e) => handleNavClick(e, '/')}>
                        Inicio
                    </a>

                    {/* Servicios Accordion */}
                    <div className={styles.accordionItem}>
                        <button
                            className={`${styles.accordionHeader} ${openAccordion === 'servicios' ? styles.active : ''}`}
                            onClick={() => toggleAccordion('servicios')}
                        >
                            <span>Servicios</span>
                            <Icon icon={ICONS.arrowDown} className={styles.accordionIcon} />
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
                            <Icon icon={ICONS.arrowDown} className={styles.accordionIcon} />
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
                            <Icon icon={ICONS.arrowDown} className={styles.accordionIcon} />
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
                        onClick={(e: any) => handleNavClick(e, '/contacto')}
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
