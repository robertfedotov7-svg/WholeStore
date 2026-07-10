"use client"
import React, {useMemo} from "react";
import { useApp } from "@/context/AppContext";

const Check = () => {

    const { cartItems, deliveryMethod } = useApp();
    const { totalCount, totalOriginalPrice, totalFinalPrice } = useMemo(() => {
        return cartItems.reduce(
            (acc, item) => {
                // Добавлена безопасная навигация ?. на случай отсутствия объекта product
                const basePrice = item.product?.oldPrice || item.product?.price || 0;
                acc.totalCount += item.quantity;
                acc.totalOriginalPrice += basePrice * item.quantity;
                acc.totalFinalPrice += (item.product?.price || 0) * item.quantity;
                return acc;
            },
            { totalCount: 0, totalOriginalPrice: 0, totalFinalPrice: 0 }
        );
    }, [cartItems]);

    const totalDiscount = totalOriginalPrice - totalFinalPrice;

    const deliveryPriceMap = {
        courier: 5000,
        pvz: 2000,
        pickup: 0,
    };
    // Защита от undefined на случай некорректного значения в method
    const totalDelivery = deliveryPriceMap[deliveryMethod.method] ?? 0;

    return (
        <aside className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">Ваш заказ</h2>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                    <span>Товары ({totalCount} шт.)</span>
                    <span>{totalFinalPrice.toLocaleString()} ₽</span>
                </div>
                {totalDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Скидка</span>
                        <span>- {totalDiscount.toLocaleString()} ₽</span>
                    </div>
                )}
                <div className="flex justify-between text-slate-500">
                    <span>Доставка</span>
                    <span>{totalDelivery === 0 ? "Бесплатно" : `${totalDelivery.toLocaleString()} ₽`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-dashed border-slate-200">
                    <span>Итого к оплате</span>
                    <span className="text-xl font-black text-blue-600">{(totalFinalPrice + totalDelivery).toLocaleString()} ₽</span>
                </div>
            </div>

            {/* Финальная кнопка с привязанным form="checkout-form" */}
            <button
                type="submit"
                form="checkout-form"
                className="w-full py-4 px-6 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
                <span>Перейти к оплате</span>
                <span>→</span>
            </button>
        </aside>
    )
}

export default Check