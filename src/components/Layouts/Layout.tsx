'use client';
import Header from '@/components/Header/Header'
import ChildrenProps from "@/types/children.types";



export default function Layout({ children }:ChildrenProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 relative overflow-hidden w-full overflow-y-auto">
                {children}
            </main>
        </div>
    )
}