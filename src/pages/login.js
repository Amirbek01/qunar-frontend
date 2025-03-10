import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Если пользователь уже залогинен, отправляем на главную
        if (localStorage.getItem('token')) {
            router.push('/');
        }
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Неверный email или пароль');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Сохраняем токен
            router.push('/'); // Перенаправляем на главную
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/auth-bg.jpg)' }}>
            <div className="bg-white bg-opacity-20 p-8 rounded-lg w-full max-w-md text-center">
                <h1 className="text-4xl font-bold text-white">QUNAR</h1>
                <p className="text-white mt-2">Спаситель ваших грядок и вашего сада</p>

                <h2 className="text-2xl font-semibold text-white mt-6">Авторизация</h2>
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                    <input
                        type="email"
                        placeholder="Логин"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 rounded bg-white w-full"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 rounded bg-white w-full"
                        required
                    />
                    <a href="#" className="text-white text-sm">Забыли пароль?</a>
                    <button type="submit" className="bg-green-500 text-white py-3 rounded-full">Войти</button>
                </form>

                <div className="text-white mt-4">
                    Нет учетной записи? <a href="/register" className="underline">Регистрация</a>
                </div>
            </div>
        </div>
    );
}
