import { useState, useEffect } from 'react';

export function useReducedMotion() {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setMatches(mediaQuery.matches);
        
        const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // For animations that SHOULD run, we return !matches (meaning motion is ALLOWED)
    // Wait, the component uses `data-animated={isAnimated}`.
    // If the user prefers REDUCED motion, isAnimated should be FALSE.
    // So isAnimated = !matches.
    return !matches;
}
