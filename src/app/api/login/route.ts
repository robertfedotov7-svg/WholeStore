import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // В новой версии библиотеки обработка этого эндпоинта
    // автоматически перехватывается в вашем middleware.ts.
    // Этот роут нужен просто как физическая точка для роутинга Next.js.
    return NextResponse.json({ success: true });
}