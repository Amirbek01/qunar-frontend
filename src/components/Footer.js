export default function Footer() {
    const footerData = [
        { title: 'Контакты', address: 'Примерова 6дА', phone: '+7 777 777 7777', email: 'example@gmail.com' },
        { title: 'Партнёрство', address: 'Примерова 6дА', phone: '+7 777 777 7777', email: 'example@gmail.com' },
        { title: 'Компания', address: 'Примерова 6дА', phone: '+7 777 777 7777', email: 'example@gmail.com' },
        { title: 'Продукты', address: 'Примерова 6дА', phone: '+7 777 777 7777', email: 'example@gmail.com' },
        { title: 'Дополнительно', address: 'Примерова 6дА', phone: '+7 777 777 7777', email: 'example@gmail.com' },
    ];

    return (
        <footer className="w-full bg-[#444444] text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
                {footerData.map((item, index) => (
                    <div key={index}>
                        <h3 className="text-white font-semibold text-lg mb-4">{item.title}</h3>
                        <p className="text-sm">{item.address}</p>
                        <p className="text-sm">{item.phone}</p>
                        <p className="text-sm">{item.email}</p>
                    </div>
                ))}
            </div>
        </footer>
    );
}
