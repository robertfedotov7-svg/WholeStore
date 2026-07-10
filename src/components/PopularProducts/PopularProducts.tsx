'use client'
import React, {useRef} from 'react';
import ProductCard from '../ProductCard/ProductCard';
import {ChevronLeft, ChevronRight} from "lucide-react";
import POPULAR_PRODUCTS from '../../data/popular-products.json'




export default function PopularProducts() {
    const carouselRef = useRef(null);

const scroll = (direction) => {
        if (carouselRef.current) {
            const track = carouselRef.current;
            const firstCard = track.firstElementChild;

            if (firstCard) {
                // Получаем ширину одной карточки
                const cardWidth = firstCard.getBoundingClientRect().width;
                // Расстояние между карточками (gap в Tailwind 'gap-5' равен 20px)
                const gap = 20;

                // Вычисляем шаг прокрутки: (ширина карточки + отступ) * 2 элемента
                const scrollStep = (cardWidth + gap) * 2;

                const scrollTo = direction === 'left'
                    ? track.scrollLeft - scrollStep
                    : track.scrollLeft + scrollStep;

                track.scrollTo({ left: scrollTo, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="w-full bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden pb-0">
            <div className="max-w-7xl mx-auto relative">

                {/* Шапка секции с кнопками управления */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Популярные товары
                    </h2>

                    {/* Стрелки навигации (скрыты на мобильных, так как там удобнее свайпать пальцем) */}
                    <div className="hidden sm:flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="flex items-center justify-center pr-0.5 w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                            aria-label="Предыдущие товары"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="flex items-center justify-center pl-0.5 w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                            aria-label="Следующие товары"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                {/* Лента карусели */}
                <div
                    ref={carouselRef}
                    className="flex h-[560px] gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none p-10 items-center"
                >
                    {POPULAR_PRODUCTS.map((product) => (
                        /* Обертка для фиксации размера и корректного snap-эффекта */
                        <div key={product.id} className="w-[300px] shrink-0 snap-center">
                            <ProductCard product={product} hight={"h-[450px]"} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
