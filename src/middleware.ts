import { NextResponse } from 'next/server';

// O painel administrativo agora é o CRM Concept.
// Qualquer acesso a /admin é redirecionado para lá (a autenticação acontece no CRM).
const CRM_DASHBOARD_URL = 'https://concept-crm-gamma.vercel.app/dashboard';

export function middleware() {
    return NextResponse.redirect(CRM_DASHBOARD_URL, 307);
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
