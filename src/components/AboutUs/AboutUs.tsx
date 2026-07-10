import React from 'react';
import { Sparkles } from "lucide-react";

export default function AboutUs() {
    // Данные для счетчиков/метрик компании
    const stats = [
        { value: '10+', label: 'Лет на рынке' },
        { value: '50к+', label: 'Товаров на складе' },
        { value: '99%', label: 'Довольных клиентов' },
        { value: '24/7', label: 'Сервисная поддержка' },
    ];

    return (
        <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center ">
            <div className="max-w-7xl mx-auto">

                {/* Сетка: Текст слева, Цифры/Метрики справа */}
                <div className="grid max-w-7xl grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Левый блок: Текстовое описание */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm font-semibold tracking-wide">
                            <Sparkles /> О компании
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                            Надежный поставщик оборудования для вашего бизнеса
                        </h2>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            Мы обеспечиваем предприятия качественной продукцией напрямую от ведущих мировых заводов. Наша цель — не просто продавать оборудование, а предоставлять комплексные решения, которые помогают автоматизировать процессы и сокращать издержки.
                        </p>

                        <p className="text-base text-slate-500 leading-relaxed">
                            Индивидуальный подход к каждому партнеру, гибкая система скидок и собственная логистика позволяют нам оперативно решать задачи любой сложности по всей стране.
                        </p>
                    </div>

                    {/* Правый блок: Карточки с ключевыми цифрами */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center shadow-sm hover:shadow-md transition-all duration-300 group"
                            >
                                {/* Цифра с мягким синим градиентом при ховере */}
                                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                                    {stat.value}
                                </div>
                                {/* Подпись */}
                                <div className="text-xs sm:text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
