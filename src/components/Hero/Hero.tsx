import HeroImg from "../../assets/HomeHeroImage.jpeg";
import SearchBar from "../SearchBar/SearchBar";
export default function Hero({Catalog, noCatalog}:any) {
    return (
        <>
            <div
                style={{ backgroundImage: `url(${HeroImg.src})` }}
                className="w-screen h-150 bg-cover bg-center flex justify-center items-end"
            >
                <h1 className="text-white absolute md:h-[16rem] lg:h-[25rem] text-[6rem] md:text-[12rem] lg:text-[20rem]">{Catalog ? Catalog : "Логотип"}</h1>
                <SearchBar noCatalog={noCatalog}/>
            </div>
        </>
    );
}