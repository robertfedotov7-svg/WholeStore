'use client'; // Обязательно добавляем для использования хуков в App Router

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Хук для получения текущего пути

export default function Navbar() {
    const pathname = usePathname(); // Получаем текущий URL (например, "/" или "/catalog")

    // Базовые стили для всех ссылок
    const baseStyle = "px-4 py-2 text-base font-medium tracking-wide rounded-xl transition-all duration-300 ease-out";

    // Стили для активной ссылки (эффект мягкой синей плашки под цвет шапки)
    const activeStyle = `${baseStyle} bg-blue-500/10 text-blue-600 shadow-sm shadow-blue-500/5`;

    // Стили для неактивной ссылки при наведении
    const inactiveStyle = `${baseStyle} text-slate-600 hover:text-slate-900 hover:bg-slate-500/5`;

    return (
        <nav className="flex justify-between items-center gap-2">
            <Link
                href="/"
                className={pathname === "/" ? activeStyle : inactiveStyle}
            >
                Главная
            </Link>

            <Link
                href="/catalog"
                className={pathname.startsWith("/catalog") ? activeStyle : inactiveStyle}
            >
                Каталог
            </Link>

            <Link
                href="/cart"
                className={pathname.startsWith("/cart") ? activeStyle : inactiveStyle}
            >
                Корзина
            </Link>
        </nav>
    );
}
