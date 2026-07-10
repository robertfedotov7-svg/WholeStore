"use client";
import React, { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { InputMask } from "@react-input/mask";
import dynamic from "next/dynamic";

const AddressSuggestions = dynamic(
    () => import('react-dadata').then((mod) => mod.AddressSuggestions),
    { ssr: false } // Отключает рендер на сервере для предотвращения гидратации
);

export default function WelcomeOnboarding() {
    const { formData, setFormData, deliveryMethod, setDeliveryMethod } = useApp();
    const [currentUser, setCurrentUser] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    router.push("/login");
                } else {
                    setCurrentUser(user);
                }
            } else {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        setIsLoading(true);
        setErrorMsg(null);

        try {
            // 1. Сохраняем все данные в Firestore, включая выбранный из DaData город
            await setDoc(doc(db, "users", currentUser.uid), {
                email: currentUser.email,
                name: formData.name,
                city: deliveryMethod.pvz, // Сохраняем значение города на сервер
                phone: formData.phone,
                role: "user",
                onboardingCompleted: true,
                createdAt: new Date().toISOString()
            }, { merge: true });

            setToast("Профиль успешно настроен! Перенаправление...");

            setTimeout(() => {
                router.push("/");
                router.refresh();
            }, 2000);

        } catch (error: any) {
            setErrorMsg(error.message || "Не удалось сохранить данные.");
            setIsLoading(false);
        }
    };

    // Общий хэндлер для полей Имени и Телефона в formData
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 font-sans antialiased relative overflow-hidden">
            {/* Анимированный Toast */}
            <div className={`fixed top-5 right-5 z-50 max-w-sm w-full transform transition-all duration-300 ease-out ${
                toast ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95 pointer-events-none"
            }`}>
                {toast && (
                    <div className="flex items-start gap-3 rounded-xl p-4 shadow-lg border bg-emerald-50 border-emerald-200 text-emerald-900">
                        <div className="mt-0.5 flex-shrink-0">
                            <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1"><p className="text-sm font-medium">{toast}</p></div>
                    </div>
                )}
            </div>

            {/* Карточка анкеты */}
            <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Добро пожаловать!</h2>
                    <p className="mt-2 text-sm text-slate-500">Пожалуйста, заполните профиль для завершения регистрации</p>
                </div>

                {errorMsg && (
                    <div className="mb-5 flex items-center gap-2 rounded-lg bg-rose-50 border border-rose-100 p-3.5 text-sm text-rose-700">
                        <svg className="h-4 w-4 flex-shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Поле: Имя */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Ваше Имя</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Иван Иванов"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                            disabled={isLoading}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                        />
                    </div>

                    {/* Поле: Город с DaData (Заменили обычный инпут) */}
                    <div className="flex flex-col gap-1.5 relative">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Город</label>
                        <AddressSuggestions
                            token="89e1f32f87adf687145f2251aaaadd25ecdbeb0a"
                            value={deliveryMethod?.pvz ? { value: deliveryMethod.pvz } : undefined}
                            filterFromBound="city"
                            filterToBound="city"
                            onChange={(suggestion) => {
                                setDeliveryMethod(prev => ({
                                    ...prev,
                                    pvz: suggestion?.data?.city || suggestion?.value || ""
                                }));
                            }}
                            inputProps={{
                                placeholder: "Начните вводить ваш город",
                                className: "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10",
                                required: true,
                                disabled: isLoading,
                                name: "pvz"
                            }}
                            containerClassName="relative"
                            suggestionsClassName="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg text-sm divide-y divide-slate-50"
                            suggestionClassName="px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors text-slate-700"
                            currentSuggestionClassName="bg-indigo-50 text-indigo-600"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Телефон (Опционально)</label>
                        <InputMask
                            mask="+7 (___) ___-__-__"
                            replacement={{ _: /\d/ }}
                            disabled={isLoading}
                            name="phone"
                            value={formData.phone}
                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            type="tel"
                            placeholder="+7 (999) 000-00-00"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full flex justify-center items-center rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 shadow-md shadow-indigo-200"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Сохранить профиль"}
                    </button>
                </form>
            </div>
        </div>
    );
}
