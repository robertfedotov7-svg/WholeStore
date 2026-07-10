import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-slate-900 text-slate-400 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto">

                {/* Основная сетка футера */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">

                    {/* Блок 1: О компании (4 колонки) */}
                    <div className="md:col-span-5 space-y-4">
            <span className="text-xl font-bold text-white tracking-wide block">
              Логотип
            </span>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Комплексные поставки промышленного и торгового оборудования напрямую от производителей. Надежность, проверенная временем.
                        </p>
                    </div>

                    {/* Блок 2: Навигация (3 колонки) */}
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                            Навигация
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors duration-200">Главная</Link>
                            </li>
                            <li>
                                <Link href="/catalog" className="hover:text-white transition-colors duration-200">Каталог</Link>
                            </li>
                            <li>
                                <Link href="/cart" className="hover:text-white transition-colors duration-200">Корзина</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Блок 3: Контакты (4 колонки) */}
                    <div className="md:col-span-4 space-y-4">
                        <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                            Контакты
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex flex-col">
                                <span className="text-xs text-slate-500">Телефон отдела продаж:</span>
                                <a href="tel:+78000000000" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium mt-0.5">
                                    8 (800) 000-00-00
                                </a>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-xs text-slate-500">Электронная почта:</span>
                                <a href="mailto:info@example.com" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 mt-0.5">
                                    info@example.com
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Нижняя часть: Копирайт и юридическая информация */}
                <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <div>
                        © {currentYear} НазваниеКомпании. Все права защищены.
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-300 transition-colors duration-200">Политика конфиденциальности</a>
                        <a href="#" className="hover:text-slate-300 transition-colors duration-200">Публичная оферта</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
