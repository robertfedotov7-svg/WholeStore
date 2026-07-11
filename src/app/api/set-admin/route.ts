import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { authConfig } from "@/shared/auth-config";

// 1. Принудительно отключаем статическую сборку для этого роута
export const dynamic = "force-dynamic";

// Функция для безопасной инициализации строго при вызове
function initFirebaseAdmin() {
    if (getApps().length === 0) {
        // Проверяем, что ВСЕ критически важные ключи присутствуют в системе
        if (!authConfig.serviceAccount?.projectId || !authConfig.serviceAccount?.privateKey) {
            throw new Error("Секретные ключи Firebase (private_key/project_id) не найдены в переменных окружения.");
        }

        initializeApp({
            credential: cert(authConfig.serviceAccount),
        });
    }
}

export async function GET() {
    try {
        // 2. ИСПРАВЛЕНО: Инициализируем базу только сейчас, когда пользователь зашел на этот URL
        initFirebaseAdmin();

        // Вставьте сюда UID вашего пользователя из вкладки Firebase Authentication
        const targetUid = "ZsyhkfJfclP2RsuhHqhrLjrs3z03";

        // Устанавливаем кастомную метку роли в токен
        await getAuth().setCustomUserClaims(targetUid, { role: "admin" });

        return NextResponse.json({
            message: "Успешно! Вы стали админом. Перезайдите в аккаунт на сайте, чтобы обновить токен."
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
