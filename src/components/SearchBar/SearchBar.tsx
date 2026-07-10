import Selector from "../Selector/Selector";
import Input from "../Input/Input";

export default function SearchBar({ noCatalog }:any) {
    return (
        <div className="z-10 translate-y-15 w-5xl h-30 px-4 bg-blue-25 backdrop-blur-xs sm:px-6 lg:px-8 bg-black-100 ml-15 mr-15 rounded-4xl shadow-top flex justify-between items-center p-8">
            <div className="flex items-center justify-between bg-white w-full h-full rounded-2xl p-5 gap-10">
                {noCatalog ? null : (
                    <Selector/>
                )}

                <Input/>
            </div>
        </div>
    );
}
