import PRODUCTS from "../../../data/products.json";
import Link from "next/link";
import { CartAdder } from "../../../components/CartAdder/CartAdder";
import ProductGallery from "../../../components/ProductGallery/ProductGallery";
import CategoryBreadcrumb from "../../../components/CategoryBreadcrumb/CategoryBreadcrumb";
// Импортируем именно TProduct, так как его ожидает компонент CartAdder
import { IProduct } from "@/types/product.types";

// 1. Описываем тип пропсов для серверного компонента Next.js
type ProductPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
    // Ждем разрешения асинхронных параметров
    const { id } = await params;

    // Находим продукт и приводим его к общему типу TProduct
    const product = PRODUCTS.find(p => String(p.id) === String(id)) as IProduct | undefined;

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-slate-800">Товар не найден</h2>
                <Link href="/catalog" className="text-blue-600 hover:underline mt-2 inline-block">Вернуться в каталог</Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10">

            {/* Навигация (Хлебные крошки) */}
            <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                <Link href='/catalog' className="hover:text-slate-800 transition-colors">Главная</Link>
                <span>/</span>
                <CategoryBreadcrumb category={product.category} />
                <span>/</span>
                <span className="text-slate-800 font-medium truncate">{product.title}</span>
            </nav>

            {/* Основная сетка */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                {/* ЛЕВЫЙ БЛОК: Галерея */}
                <ProductGallery images={product.images} title={product.title} />

                {/* ПРАВЫЙ БЛОК: Информация */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between text-sm">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold ${product.isAvailable ? "text-emerald-700 bg-emerald-50" : "bg-rose-50 text-rose-700"}`}>
                            <span className={`w-2 h-2 rounded-full ${product.isAvailable ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                            {product.isAvailable ? "В наличии" : "Под заказ"}
                        </span>
                        <span className="text-slate-400 font-mono">Арт: {product.sku}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                        {product.title}
                    </h1>

                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-wrap items-baseline gap-4 relative overflow-hidden">
                        {/* Добавили защиту по умолчанию (|| 0), чтобы .toLocaleString() не падал */}
                        <span className="text-3xl sm:text-4xl font-black text-slate-900">
                            {(product.price || 0).toLocaleString()}{product.currency}
                        </span>

                        {product.oldPrice && (
                            <>
                                <span className="text-lg text-slate-400 line-through">
                                    {product.oldPrice.toLocaleString()}{product.currency}
                                </span>
                                <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl tracking-wide">
                                    -{(product.oldPrice - product.price).toLocaleString()}{product.currency}
                                </span>
                            </>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Описание</h3>
                        <p className="text-base text-slate-600 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Теперь типы product строго совпадают с тем, что ждет CartAdder */}
                    <CartAdder product={product} />
                </div>
            </div>

            {/* НИЖНИЙ БЛОК: Характеристики */}
            {product.specs && (
                <div className="mt-16 border-t border-slate-100 pt-10 max-w-5xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Технические характеристики</h2>
                    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                        {Object.entries(product.specs).map(([key, value], idx) => (
                            <div
                                key={key}
                                className={`flex justify-between items-center px-6 py-4 text-sm sm:text-base ${
                                    idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
                                } ${idx !== 0 ? 'border-t border-slate-100' : ''}`}
                            >
                                <span className="text-slate-500 font-medium">{key}</span>
                                <span className="text-slate-900 font-semibold text-right pl-4">{String(value)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
