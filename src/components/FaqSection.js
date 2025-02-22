export default function FaqSection() {
    return (
        <section className="bg-white">
            <div className="px-6 py-10">
                <h2 className="text-3xl font-bold mb-4">FAQ</h2>
                <p className="text-gray-600 mb-6 leading-6">
                    Имеются вопросы? Есть пожелания? Тут вы найдете ответы на все актуальные вопросы.
                    <br />
                    Если вы всё же не нашли чего искали — обратитесь в поддержку и свяжитесь с нами!
                </p>
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
                    Служба поддержки
                </button>
            </div>
        </section>
    );
}
