"use client"
import React from "react";

// Добавлен относительный путь к вашему AppContext
import { useApp } from "@/context/AppContext";

// 1. ИСПРАВЛЕНО: Добавлены типы для пропсов компонента (сейчас он пустой)
interface PayBoxProps {}

const PayBox: React.FC<PayBoxProps> = () => {
    // Получаем переменные из вашего стейта
    const { paymentMethod, setPaymentMethod, invoiceData, setInvoiceData } = useApp() as any;

    // 2. ИСПРАВЛЕНО: Явно указан тип для параметра события 'e'
    const handleChangeInvoice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvoiceData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-blue-500">3.</span> Способ оплаты
            </h2>
            <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === "sbp" ? "border-blue-500 bg-blue-500/5" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <div className="flex items-center gap-4">
                        {/* 3. ИСПРАВЛЕНО: Для onChange радио-кнопки передан корректный тип события */}
                        <input type="radio" value="sbp" checked={paymentMethod === "sbp"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentMethod(e.target.value)} name="payment" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500/20" />
                        <div className="text-sm">
                            <p className="font-semibold text-slate-900">Система быстрых платежей (СБП)</p>
                            <p className="text-slate-500">Мгновенная оплата по QR-коду</p>
                        </div>
                    </div>
                    <span className="text-xl">📲</span>
                </label>

                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === "bank" ? "border-blue-500 bg-blue-500/5" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <div className="flex items-center gap-4">
                        <input type="radio" value="bank" checked={paymentMethod === "bank"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentMethod(e.target.value)} name="payment" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500/20" />
                        <div className="text-sm">
                            <p className="font-semibold text-slate-900">Банковская карта онлайн</p>
                            <p className="text-slate-500">Мир, Visa, MasterCard</p>
                        </div>
                    </div>
                    <span className="text-xl">💳</span>
                </label>

                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === "invoice" ? "border-blue-500 bg-blue-500/5" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <div className="flex items-center gap-4">
                        <input type="radio" value="invoice" checked={paymentMethod === "invoice"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentMethod(e.target.value)} name="payment" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500/20" />
                        <div className="text-sm">
                            <p className="font-semibold text-slate-900">Оплата по счету (для юрлиц)</p>
                            <p className="text-slate-500">Автоматическое выставление счета на оплату</p>
                        </div>
                    </div>
                    <span className="text-xl">📄</span>
                </label>
            </div>

            {paymentMethod === "invoice" && (
                <>
                    <div className="space-y-1 pt-2">
                        <label className="text-xs font-semibold text-slate-500">ИНН *</label>
                        <input type="text" name="inn" value={invoiceData?.inn || ""} onChange={handleChangeInvoice} placeholder="NNNNXXXXXX" className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" required />
                    </div>
                    <div className="space-y-1 pt-2">
                        <label className="text-xs font-semibold text-slate-500">Компания *</label>
                        <input type="text" name="company" value={invoiceData?.company || ""} onChange={handleChangeInvoice} placeholder="Название ООО/ИП" className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" required />
                    </div>
                    <div className="space-y-1 pt-2">
                        <label className="text-xs font-semibold text-slate-500">КПП *</label>
                        <input type="text" name="kpp" value={invoiceData?.kpp || ""} onChange={handleChangeInvoice} placeholder="КПП" className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" required />
                    </div>
                    <div className="space-y-1 pt-2">
                        <label className="text-xs font-semibold text-slate-500">Email *</label>
                        <input type="email" name="email" value={invoiceData?.email || ""} onChange={handleChangeInvoice} placeholder="info@company.ru" className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" required />
                    </div>
                </>
            )}
        </div>
    )
}

export default PayBox;
