import { NextResponse } from "next/server";
// ИСПРАВЛЕНИЕ: Импортируем CertDirectly через Service Account деструктуризацию
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { authConfig } from "@/shared/auth-config";

if (getApps().length === 0) {
    initializeApp({
        // Передаем cert напрямую вместо credential.cert
        credential: cert(authConfig.serviceAccount),
    });
}

export async function GET() {
    try {
        // Вставьте сюда UID вашего пользователя из вкладки Firebase Authentication
        const targetUid = "ZsyhkfJfclP2RsuhHqhrLjrs3z03";

        // Устанавливаем кастомную метку роли в токен
        await getAuth().setCustomUserClaims(targetUid, { role: "admin" });

        return NextResponse.json({ message: "Успешно! Вы стали админом. Перезайдите в аккаунт на сайте, чтобы обновить токен." });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
