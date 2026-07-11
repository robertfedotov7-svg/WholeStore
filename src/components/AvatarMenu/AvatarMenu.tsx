"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useApp } from "@/context/AppContext";
import {InputMask} from "@react-input/mask";
import {useAuth} from "@/context/AuthContext";
import { LogIn } from "lucide-react";

interface AvatarMenuProps {
    user: { email: string; uid: string } | null;
    role: "admin" | "user" | string;
    handleLogout: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function AvatarMenu({ handleLogout, isOpen, setIsOpen }: AvatarMenuProps) {
    // Состояния для данных пользователя из Firestore
    const { formData, setFormData } = useApp();
    const { user, role } = useAuth();

    // Состояния UI
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    // Подтягиваем данные из Firestore при открытии меню
    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(prev => ({ ...prev, name: data.name, phone: data.phone }));
                }
            };
            fetchProfile();
        }
    }, [user, isOpen]);

    // Функция сохранения изменений в профиле
    const handleSaveProfile = async () => {
        if (!user) return;
        setIsLoading(true);
        setMessage(null);
        try {
            await updateDoc(doc(db, "users", user.uid), {
                name: formData.name,
                phone: formData.phone
            });
            setMessage({ text: "Профиль успешно обновлен!", type: "success" });
            setIsEditing(false);
        } catch (err: any) {
            setMessage({ text: err.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative font-sans antialiased">
            {user ? (
                <div className="flex items-center gap-3">
                    {/* Кнопка-Аватар (Кот на месте) */}
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setIsEditing(false);
                            setMessage(null);
                        }}
                        className="group flex h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-white ring-2 ring-indigo-500/10 transition-all duration-300 hover:scale-105 hover:ring-indigo-500/30 focus:outline-none focus:ring-indigo-500/50"
                    >
                        <img
                            src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                            alt="Аватар"
                            className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                        />
                    </button>

                    {/* Меню */}
                    <div
                        className={`absolute right-0 top-12 z-50 w-72 transform rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/60 transition-all duration-200 ease-out origin-top-right ${
                            isOpen
                                ? "scale-100 opacity-100 translate-y-0"
                                : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                    >
                        {/* Системные уведомления внутри меню */}
                        {message && (
                            <div className={`mb-3 rounded-lg p-2 text-xs font-medium border ${
                                message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        {/* Информация о пользователе */}
                        <div className="mb-3 border-b border-slate-100 pb-3 space-y-2.5">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Аккаунт</p>
                                <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">{user.email}</p>
                            </div>

                            {/* Блок Редактирования */}
                            {isEditing ? (
                                <div className="space-y-2 animate-fadeIn">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase">Имя</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            className="mt-0.5 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase">Телефон</label>
                                        <InputMask
                                            mask="+7 (___) ___-__-__"
                                            replacement={{ _: /\d/ }}
                                            name="phone"
                                            value={formData.phone}
                                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            type="tel"
                                            placeholder="+7 (999) 000-00-00"
                                            className="mt-0.5 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="flex gap-1.5 pt-1">
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={isLoading}
                                            className="flex-1 rounded-md bg-indigo-600 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                                        >
                                            {isLoading ? "Сохранение..." : "Сохранить"}
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:bg-slate-50"
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Обычный просмотр профиля */
                                <div className="space-y-1.5">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Имя</p>
                                        <p className="text-xs font-medium text-slate-600">{formData.name || "Не указано"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Телефон</p>
                                        <p className="text-xs font-medium text-slate-600">{formData.phone || "Не указан"}</p>
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-left text-xs text-indigo-600 hover:text-indigo-700 font-semibold hover:underline pt-0.5"
                                    >
                                        Редактировать данные
                                    </button>
                                </div>
                            )}

                            {/* Роль */}
                            <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium bg-slate-50 border border-slate-200/60 text-slate-600">
                                <span className={`h-1.5 w-1.5 rounded-full ${role === 'admin' ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500'}`}></span>
                                Роль: {role === "admin" ? "Админ" : "Пользователь"}
                            </div>
                        </div>

                        {/* Кнопки действий */}
                        <div className="flex flex-col gap-1">
                            {role === "admin" && (
                                <Link
                                    href="/admin"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Панель администратора
                                </Link>
                            )}

                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Выйти из системы
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Link href="/login">
                    <button className="
                            inline-flex items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2

                            /* Стили для МОБИЛЬНЫХ (маленький экран): едва видимый фон и фиолетовая иконка */
                            p-2 bg-indigo-50/40 text-indigo-600 border border-indigo-500/10 shadow-none

                            /* Стили для ПК (начиная с sm: 640px) — возвращаем ваш исходный фиолетовый вид */
                            sm:px-4 sm:py-2 sm:bg-indigo-600 sm:text-white sm:border-transparent sm:shadow-sm sm:shadow-indigo-600/10 sm:hover:bg-indigo-700
                        ">

                        {/* Текст скрывается на экранах меньше 640px (sm) */}
                        <span className="hidden sm:inline">Войти в систему</span>

                        {/* Иконка: управляем её размером через контейнер или класс компонента */}
                        <span className="h-7 w-7 sm:h-4 sm:w-4 flex items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                            <LogIn />
                        </span>

                    </button>
                </Link>
            )}
        </div>
    );
}
