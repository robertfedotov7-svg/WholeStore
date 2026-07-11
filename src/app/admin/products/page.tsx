import React from "react";
import ProductCardAdmin from "@/components/ProductCard/ProductCardAdmin";
import PRODUCTS from "@/data/products.json";

export default function AdminProductsPage() {
    return (
        <div className="space-y-6">
            {/* Верхняя панель управления */}
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Товары</h1>
                    <p className="mt-2 text-sm text-slate-500">Список всех позиций, управление ценами и остатками.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button type="button" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                        Добавить товар
                    </button>
                </div>
            </div>

            {/* Таблица товаров */}
            <div className="bg-white shadow rounded-xl border border-slate-100 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-100 text-left text-sm text-slate-500">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-700 font-semibold">
                    <tr>
                        <th className="px-6 py-4">Название</th>
                        <th className="px-6 py-4">Категория</th>
                        <th className="px-6 py-4">Цена после</th>
                        <th className="px-6 py-4">Цена до</th>
                        <th className="px-6 py-4">Склад</th>
                        <th className="px-6 py-4 text-right">Действия</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">

                    {PRODUCTS.map(p => (
                        <ProductCardAdmin key={p.id} product={p as any} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
