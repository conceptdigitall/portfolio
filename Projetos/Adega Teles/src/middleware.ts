import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const unauthorized = (message: string) => NextResponse.json({ error: message }, { status: 401 });

/**
 * Se ADMIN_EMAILS estiver definido (lista separada por vírgula), só esses e-mails
 * entram no painel. Se não estiver, qualquer usuário logado no Supabase Auth entra —
 * por isso mantenha o cadastro público (sign up) DESLIGADO no Supabase.
 */
function isAllowedAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.length === 0 || list.includes(email.toLowerCase());
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Webhook de estoque: só aceita chamadas com o segredo compartilhado (n8n / Supabase).
  if (pathname.startsWith('/api/webhooks/stock-alert')) {
    const secret = process.env.STOCK_ALERT_SECRET;
    if (!secret || request.headers.get('x-webhook-secret') !== secret) {
      return unauthorized('Webhook não autorizado');
    }
    return NextResponse.next();
  }

  const isApiAdmin = pathname.startsWith('/api/admin');
  const isLoginPage = pathname === '/admin/login';

  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // Sem configuração do Supabase, o painel fica FECHADO (antes ficava aberto).
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isApiAdmin) return unauthorized('Autenticação indisponível');
    if (isLoginPage) return response;
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  // getUser() valida o token no Supabase (getSession() só lê o cookie, sem validar).
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const allowed = isAllowedAdmin(user?.email);

  // 2) APIs do painel: sem login de admin → 401 (antes ficavam abertas para qualquer um).
  if (isApiAdmin) {
    return allowed ? response : unauthorized('Não autorizado');
  }

  // 3) Páginas do painel
  if (!isLoginPage && !allowed) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (isLoginPage && allowed) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/webhooks/stock-alert'],
};
