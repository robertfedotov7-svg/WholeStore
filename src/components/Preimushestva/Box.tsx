import React from 'react';
export default function Box ({ TitleName, DesctiptionName, SVG }:any) {
    return (
        <article className="flex flex-col p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-xl mb-5 shrink-0">
                {React.cloneElement(SVG, { className: "w-6 h-6 stroke-[2]" })}
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-snug">
                {TitleName}
            </h3>

            <p className="text-base text-slate-600 leading-relaxed mt-auto">
                {DesctiptionName}
            </p>
        </article>
    )
}