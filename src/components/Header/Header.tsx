'use client';
import Link from 'next/link';
import React, {useState} from 'react';
import Navbar from '../Navbar/Navbar'; // Подключаем дочерний компонент меню
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import AvatarMenu from "../AvatarMenu/AvatarMenu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = async () => {
        await signOut(auth); // Выходим на клиенте
        await fetch("/api/logout"); // Выходим на сервере (удаляем куки)
        window.location.reload(); // Перезагружаем страницу для сброса состояния
    };
    const handleClose = ():void => {
        if (isOpen) {
            setIsOpen(false);
        }
    }
    return (
        <header
            onMouseLeave={handleClose}
            className="fixed top-0 left-0 right-0 z-50 bg-transparent flex justify-center items-center">

            <div className="w-full max-w-5xl mx-4 sm:mx-6 lg:mx-8 bg-blue-50/70 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(148,163,184,0.08)] rounded-b-3xl sm:rounded-b-[2rem]">
                <div className="flex justify-between items-center h-16 px-6 text-lg font-medium tracking-wide">

                    <Link href="/">
                        <div className="text-xl font-bold text-slate-900 hover:opacity-70 transition-opacity duration-200 cursor-pointer">
                            Логотип
                        </div>
                    </Link>

                    <Navbar/>
                    <AvatarMenu
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        handleLogout={handleLogout}
                        user={null as any}
                        role=""
                    />

                </div>
            </div>
        </header>
    );
}