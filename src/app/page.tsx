import Hero from "@/components/Hero/Hero";
import Preimushestva from "@/components/Preimushestva/Preimushestva";
import PopularProducts from "@/components/PopularProducts/PopularProducts";
import AboutUs from "@/components/AboutUs/AboutUs";
import Footer from "@/components/Footer/Footer";
export default function Home() {
    return (
        <>
            <Hero Catalog='' noCatalog={false}/>
            <Preimushestva/>
            <PopularProducts/>
            <AboutUs/>
            <Footer/>
        </>
    )
}