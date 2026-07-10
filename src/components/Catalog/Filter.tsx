import React from "react";

export default function Filter ({ handleCategoryChange, selectedCategories, handleResetAll, allCategories, onlyAvailable, handleOnlyAvailable }) {
    return (

        <aside className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Фильтры</h2>
                <button
                    onClick={handleResetAll}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                    Сбросить все
                </button>
            </div>

            {/* Фильтр: Категории */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Категория</label>
                <div className="space-y-2">
                    {allCategories.map(category => (
                        <label key={category} className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
                            <input
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                type="checkbox"
                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                            />
                            <span>{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Фильтр: Наличие */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Доступность</label>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
                        <input
                            checked={onlyAvailable}
                            onChange={handleOnlyAvailable}
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                        />
                        <span>Только в наличии</span>
                    </label>
                </div>
            </div>
        </aside>
    )
}