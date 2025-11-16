import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Permitir página inicial e arquivos estáticos sem autenticação
  if (request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({
              name,
              value,
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Adicionar timeout para evitar 408
    const getUserPromise = supabase.auth.getUser();
    const timeoutPromise = new Promise<{ data: { user: null } }>((resolve) =>
      setTimeout(() => resolve({ data: { user: null } }), 2000)
    );

    const {
      data: { user },
    } = await Promise.race([getUserPromise, timeoutPromise]);

    // Protected routes that require authentication
    const protectedRoutes = [
      '/process',
      '/final-merits',
      '/letters',
      '/criteria',
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    // Protect dashboard and other protected routes
    if (request.nextUrl.pathname.startsWith('/dashboard') || isProtectedRoute) {
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    // Redirect authenticated users away from auth pages
    const authPages = ['/login', '/signup'];
    const isAuthPage = authPages.some((page) =>
      request.nextUrl.pathname.startsWith(page)
    );

    if (isAuthPage && user) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return response;
  } catch (error) {
    // Em caso de erro, permitir acesso à página inicial
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }
    // Para rotas protegidas, redirecionar para login
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};



