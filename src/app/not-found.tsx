
import Link from 'next/link';

// Компонент обязательно должен экспортироваться как DEFAULT
export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Страница не найдена</h2>
            <p>К сожалению, запрашиваемая страница не существует.</p>
            <Link href="/">Вернуться на главную</Link>
        </div>
    );
}
