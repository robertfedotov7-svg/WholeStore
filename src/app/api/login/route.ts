import { NextRequest } from "next/server";
import { authConfig } from "@/shared/auth-config";
import { clientLoginHandler } from "next-firebase-auth-edge/lib/next/middleware";

export async function POST(request: NextRequest) {
    return clientLoginHandler(request, authConfig);
}
