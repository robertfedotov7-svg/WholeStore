"use client";

import { useState } from "react";

export default function ProductGallery({ images = [], title }) {
    const [activeImage, setActiveImage] = useState(images[0] || "");

    return (
        <div className="space-y-4">
            {/* Главное фото */}
            <div className="w-full aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center text-6xl shadow-sm">
                {activeImage ? (
                    <img src={activeImage} alt={title} className="w-full h-full object-cover" />
                ) : (
                    "📦"
                )}
            </div>

            {/* Список миниатюр */}
            <div className="flex gap-3 overflow-x-auto p-1">
                {images.map((image, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveImage(image)}
                        className={`w-20 h-20 flex-none rounded-xl overflow-hidden border-2 bg-slate-100 transition-all ${
                            activeImage === image ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-transparent hover:border-slate-300'
                        }`}
                    >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
