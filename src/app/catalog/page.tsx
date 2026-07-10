import Catalog from '@/components/Catalog/Catalog';
import React from "react";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";

export default function CatalogPage() {
    return (
        <>
            <Hero Catalog={"Каталог"} noCatalog={true}/>
            <Catalog />
            <Footer />
        </>
    );
}