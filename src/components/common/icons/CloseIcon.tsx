import closeIcon from '../../../assets/icons/close-x.svg';

interface CloseIconProps {
    size?: number;
    className?: string;
}

export function CloseIcon({ size = 13, className = '' }: CloseIconProps) {
    return (
        <img 
            src={closeIcon} 
            width={size} 
            height={size} 
            className={className}
            aria-hidden="true"
        />
    );
} 