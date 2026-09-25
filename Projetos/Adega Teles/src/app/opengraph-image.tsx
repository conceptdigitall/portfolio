import { ImageResponse } from 'next/og';

/**
 * Imagem de compartilhamento (WhatsApp, Instagram, LinkedIn, Google).
 * Gerada no build — não precisa de arquivo em /public.
 */
export const alt = 'Teles Adega Delivery';
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
                    background: '#0D0D0D',
                    color: '#FFFFFF',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, textTransform: 'uppercase', color: '#F59E0B' }}>Delivery</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>Teles Adega</div>
                    <div style={{ display: 'flex', fontSize: 36, marginTop: 24, opacity: 0.85 }}>Bebidas geladas com entrega rápida · Peça online</div>
                </div>
                <div style={{ display: 'flex', width: 160, height: 10, background: '#F59E0B', borderRadius: 999 }} />
            </div>
        ),
        { ...size },
    );
}
