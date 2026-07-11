import React from "react";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Заголовок */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Сводка данных</h1>
                <p className="mt-2 text-sm text-slate-500">Общая статистика вашего магазина на сегодня.</p>
            </div>

            {/* Сетка карточек */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Карточка 1 */}
                <div className="bg-white overflow-hidden shadow rounded-xl border border-slate-100 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 truncate">Выручка за месяц</p>
                        <p className="mt-1 text-3xl font-semibold text-slate-900">145 000 ₽</p>
                    </div>
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg text-xl">💰</div>
                </div>

                {/* Карточка 2 */}
                <div className="bg-white overflow-hidden shadow rounded-xl border border-slate-100 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 truncate">Заказы сегодня</p>
                        <p className="mt-1 text-3xl font-semibold text-slate-900">12</p>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg text-xl">🛒</div>
                </div>

                {/* Карточка 3 */}
                <div className="bg-white overflow-hidden shadow rounded-xl border border-slate-100 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 truncate">Новые клиенты</p>
                        <p className="mt-1 text-3xl font-semibold text-slate-900">4</p>
                    </div>
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg text-xl">👥</div>
                </div>
            </div>

            {/* Секция с заглушкой под график или лог событий */}
            <div className="bg-white shadow rounded-xl border border-slate-100 p-6">
                <h3 className="text-lg font-medium leading-6 text-slate-900 mb-4">Последние обновления</h3>
                <div className="border-4 border-dashed border-slate-100 rounded-xl h-48 flex items-center justify-center text-slate-400">
                    Место для графика продаж или ленты заказов
                </div>
            </div>
        </div>
    );
}
