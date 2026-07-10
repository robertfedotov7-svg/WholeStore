"use client"
import React from 'react';
import { useApp } from "@/context/AppContext";
import ProductCardCart from "@/components/ProductCard/ProductCardCart";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";

export default function Cart() { // 2. Убираем пропсы из аргументов
    const router = useRouter();

    // 3. Достаем глобальный стейт корзины из контекста
    const { cartItems } = useApp();

    // 4. Добавляем защиту: если контекст еще инициализируется, считаем корзину пустой
    const currentItems = cartItems || [];

    // 1. Считаем общее количество штук товаров в корзине (используем защищенный массив currentItems)
    const totalCount = currentItems.reduce((sum, item) => sum + item.quantity, 0);

    // 2. Считаем стоимость всех товаров по полной цене (БЕЗ скидки)
    const totalOriginalPrice = currentItems.reduce((sum, item) => {
        const basePrice = item.product?.oldPrice || item.product?.price || 0;
        return sum + (basePrice * item.quantity);
    }, 0);

    // 3. Считаем финальную стоимость к оплате (С учетом скидок)
    const totalFinalPrice = currentItems.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + (price * item.quantity);
    }, 0);

    // 4. Вычисляем чистый размер скидки
    const totalDiscount = totalOriginalPrice - totalFinalPrice;

    const handleCheckoutPage = () => {
        router.push("/checkout");
    }

    return (
        <>
            <div className="min-h-[100vh] w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20">

                {/* Заголовок страницы */}
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Корзина</h1>

                {/* Основной контейнер: Список товаров слева, Итог справа */}
                {currentItems.length <= 0 ? (
                    <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl space-y-4 mt-8">
                        <span className="text-5xl block">🛒</span>
                        <h3 className="text-xl font-bold text-slate-800">Ваша корзина пуста</h3>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto">
                            Похоже, вы еще ничего не добавили в корзину. Перейдите в каталог, чтобы выбрать оборудование.
                        </p>
                        <Link
                            href="/catalog"
                            className="inline-flex items-center justify-center py-2.5 px-6 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                        >
                            Перейти в каталог
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* ЛЕВЫЙ БЛОК: Список товаров в корзине */}
                        <div className="lg:col-span-8 space-y-4">
                            {currentItems.map(item => (
                                <ProductCardCart
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>

                        {/* ПРАВЫЙ БЛОК: Итоговый чек оформления */}
                        <aside className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 space-y-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
                                Детали заказа
                            </h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-slate-500">
                                    <span>Товары ({totalCount} шт.)</span>
                                    <span className="font-medium text-slate-800">
                                    {totalOriginalPrice.toLocaleString()} {currentItems[0]?.product?.currency || '₽'}
                                </span>
                                </div>

                                {totalDiscount > 0 && (
                                    <div className="flex justify-between text-slate-500">
                                        <span>Скидка</span>
                                        <span className="font-medium text-emerald-600">
                                        −{totalDiscount.toLocaleString()} {currentItems[0]?.product?.currency || '₽'}
                                    </span>
                                    </div>
                                )}

                                <div className="flex justify-between text-slate-500">
                                    <span>Доставка</span>
                                    <span className="font-medium text-slate-800">{totalFinalPrice >= 5000 ? "Бесплатно" : "Рассчитывается..."}</span>
                                </div>

                                {totalFinalPrice < 5000 && (
                                    <div className="flex text-end text-slate-500">
                                        <span className="font-medium text-xs text-amber-600">При заказе от 5000 ₽ доставка бесплатная</span>
                                    </div>
                                )}

                                <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
                                    <span className="text-base font-bold text-slate-900">Итого:</span>
                                    <span className="text-2xl font-black text-blue-600">
                                    {totalFinalPrice.toLocaleString()} {currentItems[0]?.product?.currency || '₽'}
                                </span>
                                </div>
                            </div>

                            <button onClick={handleCheckoutPage} className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg active:scale-[0.99] transition-all">
                                Оформить заказ
                            </button>
                        </aside>

                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
