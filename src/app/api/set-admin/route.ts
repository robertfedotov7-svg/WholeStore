import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { authConfig } from "@/shared/auth-config";

// 1. ИСПРАВЛЕНО: Говорим Next.js не трогать этот файл на этапе сборки
export const dynamic = "force-dynamic";

// 2. ИСПРАВЛЕНО: Безопасная инициализация.
// Проверяем, что Firebase еще не запущен И что у нас вообще есть ключи в системе
if (getApps().length === 0 && authConfig.serviceAccount?.projectId) {
    initializeApp({
        credential: cert(authConfig.serviceAccount),
    });
}

export async function GET() {
    try {
        // Подстраховка на случай, если кто-то вызовет роут в браузере, а ключи на Vercel забыли прописать
        if (getApps().length === 0) {
            throw new Error("Firebase Admin SDK не инициализирован. Проверьте переменные окружения.");
        }

        // Вставьте сюда UID вашего пользователя из вкладки Firebase Authentication
        const targetUid = "ZsyhkfJfclP2RsuhHqhrLjrs3z03";

        // Устанавливаем кастомную метку роли в токен
        await getAuth().setCustomUserClaims(targetUid, { role: "admin" });

        return NextResponse.json({ message: "Успешно! Вы стали админом. Перезайдите в аккаунт на сайте, чтобы обновить токен." });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
