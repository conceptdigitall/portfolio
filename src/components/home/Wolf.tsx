type WolfProps = {
    className?: string;
    /** "light" = traço branco (fundos escuros/azuis); "ink" = traço azul (fundos claros) */
    tone?: 'light' | 'ink';
    animated?: boolean;
    label?: string;
};

/** Lobo-guará geométrico da Concept, desenhado traço a traço em loop. */
const Wolf = ({ className = '', tone = 'light', animated = true, label }: WolfProps) => {
    const d = animated ? 'wolf-draw' : '';
    return (
        <svg
            viewBox="0 0 400 300"
            className={`wolf ${tone === 'ink' ? 'wolf-ink' : ''} ${animated ? 'wolf-float' : ''} ${className}`}
            role={label ? 'img' : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
        >
            <path className={d} d="M40 212 L108 150 L150 134 L255 118 L292 98 L302 62 L314 84 L326 58 L332 90 L366 110 L338 115 L312 119" />
            <path className={`${d} wolf-d2`} d="M108 150 L122 184 L40 212" />
            <path className={`${d} wolf-d3 wolf-acc`} d="M312 119 L300 142 L290 152" />
            <path className={`${d} wolf-d4`} d="M290 152 L284 196 L300 246 L316 250" />
            <path className={`${d} wolf-d4`} d="M272 164 L262 200 L272 248 L284 250" />
            <path className={`${d} wolf-d5`} d="M290 152 L272 164 L196 162 L176 172" />
            <path className={`${d} wolf-d5`} d="M176 172 L150 206 L168 248 L182 250" />
            <path className={`${d} wolf-d4`} d="M150 134 L144 178 L118 214 L104 250 L116 252" />
        </svg>
    );
};

export default Wolf;
