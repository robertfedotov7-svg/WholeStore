"use client"
import React from "react";
import { useApp }from "../../context/AppContext";
import {useAuth} from "@/context/AuthContext";

const Contacts = () => {
    const { user } = useAuth()
    const { formData } = useApp();
    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4 font-sans antialiased">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-blue-500">1.</span> Контактные данные
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                {/* Статичное поле: Имя */}
                <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Имя Фамилия</p>
                    <p className="text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 truncate">
                        {formData.name || "Не указано"}
                    </p>
                </div>

                {/* Статичное поле: Телефон */}
                <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Телефон</p>
                    <p className="text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 truncate">
                        {formData.phone || "Не указан"}
                    </p>
                </div>

                {/* Статичное поле: Почта */}
                <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Почта для чека</p>
                    <p className="text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 truncate">
                        {user?.email || "Не указана"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
