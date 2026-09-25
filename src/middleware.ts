import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Apenas aplica o Basic Auth na rota /admin
    if (req.nextUrl.pathname.startsWith('/admin')) {
        const basicAuth = req.headers.get('authorization');

        if (basicAuth) {
            const authValue = basicAuth.split(' ')[1];
            // Decode base64
            const [user, pwd] = atob(authValue).split(':');

            // Senha provisória escolhida: teste123
            // Usuário pode ser "admin"
            if (user === 'concept' && pwd === 'K2A#@A4SN5!$6%') {
                return NextResponse.next();
            }
        }

        // Se falhar, pede login nativo do navegador
        const url = req.nextUrl.clone();
        url.pathname = '/api/auth/unauthorized'; // Pode redirecionar ou apenas enviar 401
        return new NextResponse('Auth Required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Dashboard"',
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
