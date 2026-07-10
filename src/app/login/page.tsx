"use client";
import React, { useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut
} from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import {useApp} from "@/context/AppContext";

export default function Login() {
    const { formData, setFormData } = useApp();
    const [unverifiedUser, setUnverifiedUser] = useState<any>(null);
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    // Состояния для красивого UI
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "warning" } | null>(null);

    const router = useRouter();

    // Автоматически скрывать Toast через 5 секунд
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message: string, type: "success" | "warning" = "success") => {
        setToast({ message, type });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg(null);

        try {
            if (isRegister) {
                const credential = await createUserWithEmailAndPassword(auth, formData.email, password);

                // Отправляем верификацию сразу в момент регистрации
                await sendEmailVerification(credential.user);

                await signOut(auth);
                await fetch("/api/logout");

                showToast("Аккаунт создан! На почту отправлено письмо для подтверждения.", "success");
                setIsRegister(false);
                return;
            }


            // --- Логика Входа ---
            const credential = await signInWithEmailAndPassword(auth, formData.email, password);

            if (!credential.user.emailVerified) {
                setUnverifiedUser(credential.user);
                showToast("Пожалуйста, подтвердите вашу почту перед входом!", "warning");

                await signOut(auth);
                await fetch("/api/logout");
                setIsLoading(false);
                return;
            }

            const idToken = await credential.user.getIdToken();
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { Authorization: `Bearer ${idToken}` },
            });

            if (response.ok) {
                showToast("Вы успешно вошли!", "success");
                router.push("/");
                router.refresh();
            } else {
                setErrorMsg("Ошибка авторизации на сервере. Попробуйте позже.");
            }
        } catch (error: any) {
            if (error.code === "auth/invalid-credential") {
                setErrorMsg("Неверный email или пароль.");
            } else if (error.code === "auth/email-already-in-use") {
                setErrorMsg("Этот email уже зарегистрирован.");
            } else if (error.code === "auth/weak-password") {
                setErrorMsg("Пароль должен быть не менее 6 символов.");
            } else {
                setErrorMsg(error.message || "Произошла непредвиденная ошибка.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendVerification = async () => {
        if (!unverifiedUser) return;
        try {
            await sendEmailVerification(unverifiedUser);
            showToast("Письмо отправлено повторно. Проверьте почту!", "success");
        } catch (err: any) {
            setErrorMsg("Ошибка отправки: " + err.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 font-sans antialiased relative overflow-hidden">

            {/* Анимированный кастомный Toast */}
            <div className={`fixed top-5 right-5 z-50 max-w-sm w-full transform transition-all duration-300 ease-out ${
                toast ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95 pointer-events-none"
            }`}>
                {toast && (
                    <div className={`flex items-start gap-3 rounded-xl p-4 shadow-lg border ${
                        toast.type === "success"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : "bg-amber-50 border-amber-200 text-amber-950"
                    }`}>
                        <div className="mt-0.5">
                            {toast.type === "success" ? (
                                <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{toast.message}</p>
                        </div>
                        <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Карточка авторизации */}
            <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 transition-all">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        {isRegister ? "Создать аккаунт" : "Рады возвращению!"}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        {isRegister ? "Заполните данные для регистрации" : "Войдите в свой профиль"}
                    </p>
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
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Пароль
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                    >
                        {isLoading ? "Загрузка..." : isRegister ? "Зарегистрироваться" : "Войти"}
                    </button>
                </form>

                {unverifiedUser && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={handleResendVerification}
                            className="text-xs font-medium text-amber-700 hover:text-amber-800 underline decoration-dashed underline-offset-4"
                        >
                            Не пришло письмо? Отправить повторно
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setErrorMsg(null);
                        }}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        {isRegister ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
                    </button>
                </div>
            </div>
        </div>
    );
}
