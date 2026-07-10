import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // Выход из аккаунта и удаление кук также автоматически
    // обрабатываются на уровне middleware при обращении к этому URL.
    return NextResponse.json({ success: true });
}
