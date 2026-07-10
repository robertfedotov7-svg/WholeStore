import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import { authConfig } from "./shared/auth-config";

export async function proxy(request: NextRequest) {
    return authMiddleware(request, {
        loginPath: "/api/login",
        logoutPath: "/api/logout",
        apiKey: authConfig.apiKey,
        cookieName: authConfig.cookieName,
        cookieSignatureKeys: authConfig.cookieSignatureKeys,
        cookieSerializeOptions: authConfig.cookieSerializeOptions,
        serviceAccount: authConfig.serviceAccount,

        // Функция выполняется, если токен пользователя успешно проверен
        handleValidToken: async ({ token, decodedToken }) => {
            const { pathname } = request.nextUrl;

            // Проверяем, что это НЕ сервисный запрос авторизации (чтобы не сломать логику входа/выхода)
            const isAuthApi = pathname.startsWith("/api/login") || pathname.startsWith("/api/logout");

            if (!isAuthApi) {
                // НОВАЯ ПРОВЕРКА: Если почта не подтверждена, отправляем на страницу подтверждения или логина
                if (!decodedToken.email_verified) {
                    // Важно: страница, куда редиректим (например, /login или /verify-email),
                    // НЕ должна защищаться в matcher, иначе будет бесконечный цикл!
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

        // Функция выполняется, если пользователь не авторизован (гость)
        handleUnauthenticated: async () => {
            if (request.nextUrl.pathname.startsWith("/admin")) {
                // Гостей из админки сразу отправляем на страницу логина
                return NextResponse.redirect(new URL("/login", request.url));
            }
            return NextResponse.next();
        },
    });
}

// Указываем, какие пути должен обрабатывать Proxy
export const config = {
    // Включаем сюда админку и системные роуты самого firebase-edge
    matcher: ["/admin/:path*", "/api/login", "/api/logout"],
};
