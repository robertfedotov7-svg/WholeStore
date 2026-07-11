'use client'; // Обязательно добавляем для использования хуков в App Router

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Хук для получения текущего пути
import { House, ListChecks, ShoppingBasket } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname(); // Получаем текущий URL (например, "/" или "/catalog")

    // Базовые стили для всех ссылок
    const baseStyle = "px-4 py-2 text-base font-medium tracking-wide rounded-xl transition-all duration-300 ease-out";

    // Стили для активной ссылки (эффект мягкой синей плашки под цвет шапки)
    const activeStyle = `${baseStyle} bg-blue-500/10 text-blue-600 shadow-sm shadow-blue-500/5`;

    // Стили для неактивной ссылки при наведении
    const inactiveStyle = `${baseStyle} text-slate-600 hover:text-slate-900 hover:bg-slate-500/5`;

    return (
        <nav className="flex justify-between items-center gap-4 sm:gap-6">
            <Link
                href="/"
                className={`${pathname === "/" ? activeStyle : inactiveStyle} flex items-center gap-2`}
            >
                {/* Эмодзи виден всегда, на мобильных станет чуть крупнее для удобства нажатия */}
                <span className="text-xl md:text-base" title="Главная"><House /></span>
                {/* Текст скрывается на экранах меньше 768px (md) */}
                <span className="hidden md:inline">Главная</span>
            </Link>

            <Link
                href="/catalog"
                className={`${pathname.startsWith("/catalog") ? activeStyle : inactiveStyle} flex items-center gap-2`}
            >
                <span className="text-xl md:text-base" title="Каталог"><ListChecks /></span>
                <span className="hidden md:inline">Каталог</span>
            </Link>

            <Link
                href="/cart"
                className={`${pathname.startsWith("/cart") ? activeStyle : inactiveStyle} flex items-center gap-2`}
            >
                <span className="text-xl md:text-base" title="Корзина"><ShoppingBasket /></span>
                <span className="hidden md:inline">Корзина</span>
            </Link>
        </nav>
    );
}
