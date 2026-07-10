import Box from './Box';
import { HandFist, TruckElectric, Package, HandCoins} from "lucide-react";

export default function Preimushestva () {
    return (
        <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 pt-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Box
                        SVG={<TruckElectric />}
                        TitleName="Быстрая доставка"
                        DesctiptionName="Оперативно отгружаем товары со склада и доставляем по всей стране через проверенные транспортные компании."
                    />
                    <Box
                        SVG={<Package />}
                        TitleName="Прямые поставки от производителей"
                        DesctiptionName="Работаем напрямую с заводами и официальными поставщиками, что позволяет предлагать выгодные цены без лишних посредников."
                    />
                    <Box
                        SVG={<HandCoins />}
                        TitleName="Персональные коммерческие предложения"
                        DesctiptionName="Подготавливаем индивидуальные условия сотрудничества, скидки и специальные цены для оптовых клиентов."
                    />
                    <Box
                        SVG={<HandFist />}
                        TitleName="Техническая поддержка и консультации"
                        DesctiptionName="Помогаем подобрать оборудование под задачи вашего бизнеса и консультируем на всех этапах покупки."
                    />
                </div>
            </div>
        </section>
    )
}
