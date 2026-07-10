import { NextRequest } from "next/server";
import { authConfig } from "@/shared/auth-config";
import { clientLogoutHandler } from "next-firebase-auth-edge/lib/next/middleware";

export async function GET(request: NextRequest) {
    return clientLogoutHandler(request, authConfig);
}
