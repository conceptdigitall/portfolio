import { ImageResponse } from 'next/og';

/**
 * Imagem de compartilhamento (WhatsApp, Instagram, LinkedIn, Google).
 * Gerada no build — não precisa de arquivo em /public.
 */
export const alt = 'Concept Digital — landing pages, CRMs e sistemas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '72px 80px',
                    background: '#0624C7',
                    color: '#FFFFFF',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, textTransform: 'uppercase', color: '#FCE026' }}>Baixada Santista</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>Concept Digital</div>
                    <div style={{ display: 'flex', fontSize: 36, marginTop: 24, opacity: 0.85 }}>Landing pages, CRM e sistemas que vendem</div>
                </div>
                <div style={{ display: 'flex', width: 160, height: 10, background: '#FCE026', borderRadius: 999 }} />
            </div>
        ),
        { ...size },
    );
}
