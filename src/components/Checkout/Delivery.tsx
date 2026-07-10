"use client";
import { useApp } from "../../context/AppContext";
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-dadata/dist/react-dadata.css';

// 1. ВЫНОСИМ ИМПОРТ ЗА ПРЕДЕЛЫ КОМПОНЕНТА СТРОГО СЮДА
const AddressSuggestions = dynamic(
    () => import('react-dadata').then((mod) => mod.AddressSuggestions),
    { ssr: false } // Полностью отключает рендер на сервере
);

const Delivery = () => {
    const { deliveryMethod, setDeliveryMethod } = useApp();

    const handleChangeDeliveryMethod = (e) => {
        setDeliveryMethod(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const methods = [
        {
            id: 'courier',
            title: 'Доставка курьером',
            description: 'До двери, от 2 дней'
        },
        {
            id: 'pvz',
            title: 'Доставка в ПВЗ',
            description: 'В ПВЗ, от 2 дней'
        },
        {
            id: 'pickup',
            title: 'Самовывоз со склада',
            description: 'Бесплатно, сегодня'
        }
    ];

    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-blue-500">2.</span> Способ доставки
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Курьер */}
                {methods.map((method) => (
                    <label key={method.id} className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${deliveryMethod?.method === method.id ? "border-blue-500 bg-blue-500/5" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                        <input type="radio" value={method.id} checked={deliveryMethod?.method === method.id} onChange={handleChangeDeliveryMethod} name="method" className="mt-1 w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500/20" />
                        <div className="text-sm">
                            <p className="font-semibold text-slate-900">{method.title}</p>
                            <p className="text-slate-500 mt-0.5">{method.description}</p>
                        </div>
                    </label>
                ))}
            </div>

            {(deliveryMethod?.method === "courier" || deliveryMethod?.method === "pvz") && (
                <div className="space-y-1 pt-2">
                    <label className="text-xs font-semibold text-slate-500">Город и адрес доставки *</label>

                    {/* Вставляем DaData */}
                    <AddressSuggestions
                        token="89e1f32f87adf687145f2251aaaadd25ecdbeb0a"
                        // 2. ИСПРАВЛЕНО: Читаем адрес напрямую из стейта контекста (или ставим пустую строку по дефолту)
                        value={deliveryMethod?.address ? { value: deliveryMethod.address } : undefined}
                        onChange={(suggestion) => {
                            handleChangeDeliveryMethod({
                                target: {
                                    name: 'address',
                                    value: suggestion?.value ?? ''
                                }
                            });
                        }}
                        inputProps={{
                            placeholder: "г. Москва, ул. Ленина, д. 10, кв. 5",
                            className: "w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all",
                            required: true,
                            name: "address"
                        }}
                        containerClassName="relative"
                        suggestionsClassName="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg text-sm divide-y divide-slate-50"
                        suggestionClassName="px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors text-slate-700"
                        currentSuggestionClassName="bg-blue-50 text-blue-600"
                    />
                </div>
            )}
        </div>
    )
}

export default Delivery;
