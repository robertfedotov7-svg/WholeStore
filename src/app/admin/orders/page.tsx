import React from "react";

export default function AdminOrdersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Заказы</h1>
                <p className="mt-2 text-sm text-slate-500">Отслеживание статусов оплаты, сборки и доставки покупателям.</p>
            </div>

            {/* Таблица заказов */}
            <div className="bg-white shadow rounded-xl border border-slate-100 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-100 text-left text-sm text-slate-500">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-700 font-semibold">
                    <tr>
                        <th className="px-6 py-4">ID Заказа</th>
                        <th className="px-6 py-4">Покупатель</th>
                        <th className="px-6 py-4">Дата</th>
                        <th className="px-6 py-4">Сумма</th>
                        <th className="px-6 py-4">Статус</th>
                        <th className="px-6 py-4 text-right">Управление</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-950">#1024</td>
                        <td className="px-6 py-4">
                            <div className="text-slate-900 font-medium">Иван Иванов</div>
                            <div className="text-xs text-slate-400">ivan@example.com</div>
                        </td>
                        <td className="px-6 py-4">11.07.2026</td>
                        <td className="px-6 py-4 font-semibold text-slate-900">6 400 ₽</td>
                        <td className="px-6 py-4">
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    Доставлен
                                </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">Детали</button>
                        </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-950">#1025</td>
                        <td className="px-6 py-4">
                            <div className="text-slate-900 font-medium">Анна Петрова</div>
                            <div className="text-xs text-slate-400">anna@example.com</div>
                        </td>
                        <td className="px-6 py-4">10.07.2026</td>
                        <td className="px-6 py-4 font-semibold text-slate-900">1 900 ₽</td>
                        <td className="px-6 py-4">
                                <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
                                    В обработке
                                </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">Детали</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
