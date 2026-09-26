import type { ReactNode } from 'react';
import Breadcrumbs from './Breadcrumbs';

/** Moldura das páginas internas (404, obrigado, privacidade), no tema dark. */
export default function PageShell({
    crumbs,
    eyebrow,
    title,
    children,
}: {
    crumbs: { name: string; href: string }[];
    eyebrow?: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-10 pt-10 lg:pt-14 pb-24 lg:pb-32 flex flex-col gap-8">
            <Breadcrumbs items={crumbs} />
            <div className="flex flex-col gap-3.5">
                {eyebrow && (
                    <span className="text-sm font-semibold tracking-[0.14em] uppercase text-concept-yellow">{eyebrow}</span>
                )}
                <h1 className="font-poppins text-[38px] sm:text-5xl lg:text-[60px] font-bold leading-[1.05] tracking-[-0.02em]">{title}</h1>
            </div>
            {children}
        </section>
    );
}
