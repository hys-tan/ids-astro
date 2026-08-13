import React, { memo } from 'react';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    href?: string;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
}

const Button: React.FC<ButtonProps> = memo(({
    href,
    children,
    className,
    variant = 'primary',
    ...props
}) => {
    // Combina la clase base (.button), la variante elegida (.primary, .secondary) y cualquier clase extra
    const combinedClasses = `${styles.button} ${styles[variant]} ${className || ''}`;

    if (href) {
        // En Astro todo es un <a> normal, ya no usamos <Link> de react-router-dom
        return (
            <a
                href={href}
                className={combinedClasses}
                onClick={props.onClick as any}
                {...(props as any)}
            >
                <span>{children}</span>
            </a>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            <span>{children}</span>
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
