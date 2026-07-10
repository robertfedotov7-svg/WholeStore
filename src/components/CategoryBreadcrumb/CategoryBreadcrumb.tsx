"use client";

import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext"; // Проверьте правильность этого пути к контексту

export default function CategoryBreadcrumb({ category }: any) {
    const router = useRouter();
    const { setSelectedCategories } = useApp();

    const handleClick = () => {
        setSelectedCategories([category]);
        router.push('/catalog');
    };

    return (
        <div
            onClick={handleClick}
            className="hover:text-slate-800 transition-colors cursor-pointer"
        >
            {category}
        </div>
    );
}
