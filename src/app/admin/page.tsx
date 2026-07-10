"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Если загрузка прошла, а юзер не админ — выкидываем его на главную
        if (!loading && (!user || role !== "admin")) {
            router.push("/");
        }
    }, [user, role, loading, router]);

    if (loading) return <div style={{ padding: "20px" }}>Проверка прав доступа...</div>;
    if (!user || role !== "admin") return null; // Не рендерим контент до редиректа

    return (
        <div style={{ padding: "20px", color: "red" }} className="mt-10">
            <h1>👑 Секретная Админ-Панель Next.js</h1>
            <p>Сюда пустило только потому, что у вас роль "admin" в Firestore.</p>
        </div>
    );
}
