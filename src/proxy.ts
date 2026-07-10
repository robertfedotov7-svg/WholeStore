import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import { authConfig } from "./shared/auth-config";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. ЗАЩИТА АДМИНКИ ДЛЯ ГОСТЕЙ: Если токена/куки нет вообще, сразу редиректим на логин
    if (pathname.startsWith("/admin")) {
        const hasAuthCookie = request.cookies.has(authConfig.cookieName);
        if (!hasAuthCookie) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return authMiddleware(request, {
        loginPath: "/api/login",
        logoutPath: "/api/logout",
        apiKey: authConfig.apiKey,
        cookieName: authConfig.cookieName,
        cookieSignatureKeys: authConfig.cookieSignatureKeys,
        cookieSerializeOptions: authConfig.cookieSerializeOptions,
        serviceAccount: authConfig.serviceAccount,

        // Выполняется, если токен пользователя успешно проверен
        handleValidToken: async ({ token, decodedToken }) => {
            const isAuthApi = pathname.startsWith("/api/login") || pathname.startsWith("/api/logout");

            if (!isAuthApi) {
                // Проверка подтверждения почты
                if (!decodedToken.email_verified) {
                    return NextResponse.redirect(new URL("/login", request.url));
                }

                // Проверка прав для административной панели
                if (pathname.startsWith("/admin")) {
                    const role = decodedToken.role;
                    if (role !== "admin") {
                        return NextResponse.redirect(new URL("/", request.url));
                    }
                }
            }

            return NextResponse.next();
        },

        // 2. ИСПРАВЛЕНО: Вместо handleUnauthenticated используем handleError.
        // Он сработает, если токен невалидный, просрочен или отсутствует.
        handleError: async (error) => {
            if (pathname.startsWith("/admin")) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
            return NextResponse.next();
        },
    });
}

// Указываем, какие пути должен обрабатывать Proxy
export const config = {
    matcher: ["/admin/:path*", "/api/login", "/api/logout"],
};
