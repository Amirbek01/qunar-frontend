import { useEffect, useState } from "react";
import { useBusketStore } from "@/store/useBusketStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Busket() {
    const { busket, updateQuantity, removeFromBusket, clearBusket } = useBusketStore();
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [step, setStep] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        setTotalPrice(
            busket.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );
    }, [busket]);

    const saveCartToBackend = async () => {
        const token = localStorage.getItem('token');
        try {
            await Promise.all(
                busket.map(product =>
                    fetch('https://vencera.tech/qunarBack/cart/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            product_id: product.id,
                            quantity: product.quantity,
                        }),
                    })
                )
            );
        } catch (error) {
            console.error('Ошибка при сохранении корзины:', error);
            throw new Error('Ошибка сохранения корзины. Попробуйте позже.');
        }
    };

    const handleOrderSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        if (busket.length === 0) {
            setErrorMessage('Ваша корзина пуста.');
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const res = await fetch('https://vencera.tech/qunarBack/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({})
            });

            if (res.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Ошибка при отправке заказа');
            }

            setSuccessMessage('Спасибо за заказ! Отдел продаж свяжется с вами в ближайшее время.');
            setTimeout(() => {
                router.push('/');
            }, 4000);

            clearBusket();
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
            setErrorMessage(error.message || 'Ошибка при оформлении заказа.');
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = async () => {
        if (loading) return;
        setErrorMessage('');
        setSuccessMessage('');

        if (step === 1) {
            try {
                await saveCartToBackend();
                setStep(2);
            } catch (error) {
                setErrorMessage(error.message);
            }
        } else if (step === 2) {
            await handleOrderSubmit();
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Хедер */}
            <header className="fixed top-0 w-full bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white shadow-lg z-20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/qunar-logo-circle.png" alt="QUNAR.AI" className="h-10 w-auto" />
                        <span className="text-2xl font-extrabold">QUNAR</span>
                    </Link>
                    <nav className="hidden md:flex gap-8 font-semibold">
                        <Link href="/" className="hover:text-green-300 transition">Главная</Link>
                        <Link href="/product" className="hover:text-green-300 transition">Qunar Маркет</Link>
                        <Link href="/about" className="hover:text-green-300 transition">О нас</Link>
                        <Link href="/ai" className="hover:text-green-300 transition">Qunar AI</Link>
                    </nav>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/busket" className="hover:text-green-300 transition">
                            <FaShoppingCart size={24} />
                        </Link>
                        <Link href="/account" className="hover:text-green-300 transition">
                            <FaUserCircle size={24} />
                        </Link>
                    </div>
                    <button className="md:hidden p-2 hover:bg-green-700 rounded-full transition" onClick={() => setMenuOpen(prev => !prev)}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                {menuOpen && (
                    <div className="md:hidden bg-[#196F3D] bg-opacity-95 backdrop-blur-sm px-6 py-4 space-y-3">
                        <Link href="/" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Главная</Link>
                        <Link href="/product" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Qunar Маркет</Link>
                        <Link href="/about" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>О нас</Link>
                        <Link href="/ai" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Qunar AI</Link>
                        <Link href="/busket" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Корзина</Link>
                        <Link href="/account" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Аккаунт</Link>
                    </div>
                )}
            </header>

            {/* Контент */}
            <main className="flex-1 max-w-7xl mx-auto px-4 py-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Левый блок */}
                    <div className="lg:col-span-8 space-y-6 ">
                        {busket.map(item => (
                            <div key={item.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={item.image || '/placeholder.png'} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-gray-500 text-sm">{item.description || "Без описания"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-4 md:mt-0">
                                    <button onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))} className="px-2 py-1 border rounded hover:bg-gray-100 transition">-</button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded hover:bg-gray-100 transition">+</button>
                                </div>
                                <div className="flex items-center gap-4 mt-4 md:mt-0">
                                    <span className="font-bold text-gray-800">{item.price * item.quantity} ₸</span>
                                    <button onClick={() => removeFromBusket(item.id)} className="text-red-500 text-2xl hover:text-red-600 transition">×</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Правый блок */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-xl p-6 shadow-md flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">Сумма заказа</h3>
                                <div className="space-y-2 text-gray-700 mb-6">
                                    {busket.map(item => (
                                        <p key={item.id} className="flex justify-between text-sm">
                                            {item.name} x{item.quantity}
                                            <span>{item.price * item.quantity} ₸</span>
                                        </p>
                                    ))}
                                </div>
                                <hr />
                                <h4 className="text-xl font-bold mt-6 text-gray-900">К оплате: {totalPrice} ₸</h4>
                            </div>
                            <button
                                onClick={handleButtonClick}
                                disabled={loading}
                                className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full text-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Отправка...' : step === 1 ? 'Сохранить корзину' : 'Подтвердить заказ'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Футер */}
            <footer className="bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white py-4 text-center">
                &copy; {new Date().getFullYear()} QUNAR.AI. Все права защищены.
            </footer>
        </div>
    );
}
