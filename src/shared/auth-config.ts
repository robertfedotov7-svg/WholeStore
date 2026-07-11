
const formatPrivateKey = (key: string | undefined): string => {
    if (!key) return "";

    // 1. Очищаем строку от случайных кавычек по краям, которые часто добавляют в .env файлы
    const cleanKey = key.replace(/^["'`]|["'`]$/g, '').trim();

    // 2. Если ключ уже содержит реальные переносы строк, возвращаем его
    if (cleanKey.includes('\n')) {
        return cleanKey;
    }

    // 3. Если ключ записан в одну строку с текстовыми \n, принудительно преобразуем их в символы переноса
    return cleanKey.replace(/\\n/g, '\n');
};

export const authConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: "AuthToken",
    cookieSignatureKeys: ["secret-key-safe-and-long-1234567890", "backup-key-safity"], // Используйте любые случайные строки
    cookieSerializeOptions: {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 12 * 60 * 60, // 12 часов сессии
    },
    serviceAccount: {
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
        privateKey: formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY),
    },
};