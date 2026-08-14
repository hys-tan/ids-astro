import { useState, useEffect, useRef } from 'react';

export type ScrollState = 'at-top' | 'scroll-down' | 'scroll-up';

export const useStickyNavbar = (isMenuOpen: boolean) => {
    const [scrollState, setScrollState] = useState<ScrollState>('at-top');
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        // Inicializar con el valor actual si estamos en el cliente
        if (typeof window !== 'undefined') {
            lastScrollY.current = window.scrollY;
        }

        // Umbral mínimo para evitar flickering por micro-scrolls
        const SCROLL_THRESHOLD = 5;

        const updateScrollState = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 0) {
                setScrollState('at-top');
            } else if (
                currentScrollY > lastScrollY.current &&
                currentScrollY > SCROLL_THRESHOLD
            ) {
                setScrollState('scroll-down');
            } else if (currentScrollY < lastScrollY.current) {
                setScrollState('scroll-up');
            }

            lastScrollY.current = currentScrollY;
        };

        const onScroll = () => {
            // No actualizar estado mientras el menú está abierto
            if (isMenuOpen) return;
            if (ticking.current) return;
            ticking.current = true;
            requestAnimationFrame(() => {
                updateScrollState();
                ticking.current = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateScrollState(); // Check inicial por si la página carga con scroll != 0

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [isMenuOpen]);

    return { scrollState };
};
