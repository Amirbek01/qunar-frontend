import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [fullName, setFullName] = useState('');


    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/');
        }
    }, []);

    async function handleRegister(e) {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, fullName }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при регистрации');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            router.push('/'); // Перенаправляем на главную страницу
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className="bg-[rgba(68,68,68,1)]  bg-opacity-30 p-8 rounded-[38px] w-full max-w-md text-center">
                <h1 className="text-4xl font-bold text-white">QUNAR</h1>
                <p className="text-white mt-2">Спаситель ваших грядок и вашего сада</p>

                <h2 className="text-2xl font-semibold text-white mt-6">Регистрация</h2>
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="ФИО"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="p-3 rounded bg-white w-full"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Почта"
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
                    <input
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-3 rounded bg-white w-full"
                        required
                    />
                    <button type="submit" className="bg-green-500 text-white py-3 rounded-full">Зарегистрироваться</button>
                </form>

                <div className="text-white mt-4">
                    Уже зарегистрированы? <a href="/login" className="underline">Авторизация</a>
                </div>
            </div>
        </div>
    );
}
