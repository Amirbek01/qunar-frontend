import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9\-\+\s\(\)]{7,15}$/
        return phoneRegex.test(phone)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')

        if (!validatePhone(phone)) {
            setError('Некорректный номер телефона')
            return
        }

        if (password !== confirmPassword) {
            setError('Пароли не совпадают')
            return
        }

        setLoading(true)

        try {
            const res = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    password,
                }),
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.message || 'Ошибка при регистрации')
            }

            const data = await res.json()
            localStorage.setItem('token', data.accessToken)
            router.push('/product')
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

                <h2 className="text-2xl font-semibold text-white mt-6">Регистрация</h2>
                {error && <p className="text-red-500 mt-2">{error}</p>}

                <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="ФИО"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="p-3 rounded bg-white w-full"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Телефон"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="p-3 rounded bg-white w-full"
                        required
                    />
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
                    <input
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="p-3 rounded bg-white w-full"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`py-3 rounded-full text-white transition-all ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </button>
                </form>

                <div className="text-white mt-4">
                    Уже зарегистрированы?{' '}
                    <a href="/login" className="underline">
                        Авторизация
                    </a>
                </div>
            </div>
        </div>
    )
}
