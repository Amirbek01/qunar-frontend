import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    async function handleLogin(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('http://176.123.178.135:6063/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.message || 'Неверный email или пароль')
            }

            const data = await res.json()
            localStorage.setItem('token', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            // Можно сохранить имя, если оно приходит
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
            }
            router.push('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className="bg-[rgba(68,68,68,1)] bg-opacity-30 p-8 rounded-[38px] w-full max-w-md text-center">
                <h1 className="text-4xl font-bold text-white">QUNAR</h1>
                <p className="text-white mt-2">Спаситель ваших грядок и вашего сада</p>

                <h2 className="text-2xl font-semibold text-white mt-6">Авторизация</h2>
                {error && <p className="text-red-500 mt-2">{error}</p>}

                <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                    <input
                        type="email"
                        placeholder="Почта"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="p-3 rounded bg-white w-full"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="p-3 rounded bg-white w-full"
                        required
                    />
                    <a href="#" className="text-white text-sm self-start hover:underline">Забыли пароль?</a>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`py-3 rounded-full text-white transition-all ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {loading ? 'Загрузка...' : 'Войти'}
                    </button>
                </form>

                <div className="text-white mt-4">
                    Нет учетной записи?{' '}
                    <a href="/register" className="underline">
                        Регистрация
                    </a>
                </div>
            </div>
        </div>
    )
}
