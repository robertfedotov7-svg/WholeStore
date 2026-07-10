"use client"
import React, { useState, useMemo } from 'react';
import PRODUCTS from "../../data/products.json";
import ProductCard from "../ProductCard/ProductCard";
import Filter from "./Filter";
import {useApp} from "../../context/AppContext";

export default function Catalog() {
    const { selectedCategories, setSelectedCategories, searchQuery, setSearchQuery } = useApp();
    const allCategories = useMemo(() => [...new Set(PRODUCTS.map(p => p.category))], []);
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [sortBy, setSortBy] = useState("default");

    const handleCategoryChange = (categoryName:string):void => {
        if (selectedCategories.includes(categoryName)) {
            setSelectedCategories(selectedCategories.filter((item:string) => item !== categoryName));
        } else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }
    };

    const handleOnlyAvailable = () => {
        setOnlyAvailable(!onlyAvailable);
    };

    // Кнопка сброса всех фильтров
    const handleResetAll = () => {
        setSelectedCategories([]);
        setOnlyAvailable(false);
        setSortBy("default");
        setSearchQuery(""); // Сбрасываем и поиск
    };

    // Объединенная фильтрация и сортировка внутри useMemo
    const processedProducts = useMemo(() => {
        // 1. Сначала фильтруем товары
        let result = PRODUCTS.filter(product => {
            const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCategories = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchAvailable = onlyAvailable ? product.isAvailable : true;

            return matchSearch && matchCategories && matchAvailable;
        });

        // 2. Затем сортируем получившийся результат (делаем копию через [...result])
        if (sortBy === "price-asc") {
            return [...result].sort((a, b) => a.price - b.price);
        }
        if (sortBy === "price-desc") {
            return [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [searchQuery, selectedCategories, onlyAvailable, sortBy]); // Зависимости переданы правильно

    return (
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10">

            {/* Основной контейнер */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* ЛЕВЫЙ БЛОК: Панель фильтров */}
                <Filter handleCategoryChange={handleCategoryChange} selectedCategories={selectedCategories} handleResetAll={handleResetAll} allCategories={allCategories} onlyAvailable={onlyAvailable} handleOnlyAvailable={handleOnlyAvailable}></Filter>

                {/* ПРАВЫЙ БЛОК: Сортировка и Сетка */}
                <main className="lg:col-span-9 space-y-6">
                    {/* Панель сортировки и счетчик */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4">
                        <span className="text-sm text-slate-500 font-medium">
                            Найдено товаров: <strong className="text-slate-900 font-semibold">{processedProducts.length}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500 whitespace-nowrap">Сортировка:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer hover:text-slate-900"
                            >
                                <option value="default">По популярности</option>
                                <option value="price-asc">Сначала дешевле</option>
                                <option value="price-desc">Сначала дороже</option>
                            </select>
                        </div>
                    </div>

                    {/* Вывод заглушки или сетки товаров */}
                    {processedProducts.length === 0 ? (
                        <div className="w-full text-center py-16 bg-white border border-slate-100 rounded-2xl space-y-2">
                            <span className="text-4xl block">🔍</span>
                            <h3 className="text-lg font-bold text-slate-800">Товары не найдены</h3>
                            <p className="text-sm text-slate-500">Попробуйте изменить параметры фильтрации или поисковый запрос</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {processedProducts.map(p => (
                                <ProductCard key={p.id} product={p as any} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
