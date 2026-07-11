import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "@/shared/auth-config";
import { getFirebaseAuth } from "next-firebase-auth-edge";

export async function POST(request: NextRequest) {
    try {
        // Используем встроенный метод библиотеки для генерации кук сессии
        const auth = getFirebaseAuth(authConfig);
        const { token } = await request.json();

        // Создаем и возвращаем ответ с выставленными куками авторизации
        const response = NextResponse.json({ success: true });
        // Библиотека сама запишет куки в объект ответа
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
