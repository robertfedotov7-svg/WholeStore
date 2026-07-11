"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { user, role, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && (!user || role !== "admin")) {
            router.push("/");
        }
    }, [user, role, loading, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600 font-medium">
                <div className="animate-pulse">Проверка прав доступа...</div>
            </div>
        );
    }

    if (!user || role !== "admin") {
        return null;
    }

    // Хелпер для подсветки активного пункта меню
    const linkClass = (path: string) => `
        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
        ${pathname === path
        ? "bg-blue-600 text-white"
        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}
    `;

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Боковое меню (Сайдбар) */}
            <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col justify-between shrink-0 shadow-xl">
                <div>
                    <div className="flex items-center gap-2 px-2 py-3 mb-6 border-b border-slate-800">
                        <span className="text-xl">👑</span>
                        <span className="font-bold text-lg tracking-wide">Панель админа</span>
                    </div>

                    <nav className="space-y-1">
                        <Link href="/admin" className={linkClass("/admin")}>
                            <span>📊</span> Главная
                        </Link>
                        <Link href="/admin/products" className={linkClass("/admin/products")}>
                            <span>📦</span> Товары
                        </Link>
                        <Link href="/admin/orders" className={linkClass("/admin/orders")}>
                            <span>🛒</span> Заказы
                        </Link>
                    </nav>
                </div>

                <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 text-center">
                    Магазин v1.0.0
                </div>
            </aside>

            {/* Основной контент */}
            <main className="flex-1 p-8 overflow-y-auto pt-20">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
