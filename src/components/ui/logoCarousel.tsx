import styles from './logoCarousel.module.css';
import type { BrandLogo } from '../../data/ventas';

interface LogoCarouselProps {
    logos: BrandLogo[];
    isAnimated?: boolean;
}

export default function LogoCarousel({ logos, isAnimated = true }: LogoCarouselProps) {
    // Truco matemático para el bucle perfecto: duplicamos la lista exactamente una vez
    const duplicatedLogos = [...logos, ...logos];

    return (
        <div className={styles.mask}>
            <div className={styles.track} data-animated={isAnimated}>
                {duplicatedLogos.map((brand, index) => (
                    <div 
                        key={`${brand.name}-${index}`} 
                        className={styles.brandItem}
                        aria-hidden={index >= logos.length ? "true" : undefined}
                    >
                        <img
                            src={brand.file.src}
                            alt={brand.name}
                            className={styles.brandImage}
                            loading="lazy"
                            decoding="async"
                            width="330"
                            height="65"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
