import { log } from 'har-validator';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Checkout = () => {
    const [selectedCard, setSelectedCard] = useState("https://readymadeui.com/images/visa.webp");
    const [paymentMethod, setPaymentMethod] = useState("visa");
    const [cardNumber, setCardNumber] = useState('');
    const loggedInData = useSelector((state) => state.wishList.loggedIn)

    const handleCardSelection = (imageUrl, method) => {
        setSelectedCard(imageUrl);
        setPaymentMethod(method);
    };

    useEffect(() => {
        if (!loggedInData) {
            window.location.href = "/register"
        }
    }, [])

    const handleClick = (e) => {
        e.preventDefault();

        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
        }


        localStorage.removeItem("basketItems")
        toast.success('Payment was successfully!');


        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    };


    const handleTermsClick = (e) => {
        e.preventDefault();
    };


    const basketData = useSelector((state) => state.counter.basketItems)
    const basketQuantity = useSelector((state) => state.counter.basketQuantity)
    console.log(basketQuantity)



    const handleChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        const formattedInput = input
            .replace(/(.{4})(?=.)/g, '$1-')
            .slice(0, 19);
        setCardNumber(formattedInput);
    };




    const uniqueArray = Array.from(
        new Map(basketData.map(item => [item.id, item])).values()
    );


    const totalSum = uniqueArray.reduce((sum, item) => {
        const quantityObject = basketData.find(q => q.id === item.id);
        const quantity = quantityObject ? quantityObject.quantity : 1;
        return sum + (item.price * quantity);
    }, 0);

    return (
        <div>
            <div className="rounded-lg border font-[sans-serif] bg-white sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] mx-auto w-full relative">
                <div>
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="px-5 lg:col-span-2 max-lg:order-1 !pr-0 max-w-4xl mx-auto w-full">
                            <div className="text-center max-lg:hidden">
                                <h2 className="text-3xl font-extrabold text-gray-800 inline-block pb-1">Checkout</h2>
                            </div>
                            <form className="lg:mt-8" onSubmit={handleClick}>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Shipping info</h2>

                                    <div className="grid sm:grid-cols-2 gap-8 mt-8">
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Name"
                                                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-[#C4932C] outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="email"
                                                placeholder="Email address"
                                                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-[#C4932C] outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Street address"
                                                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-[#C4932C] outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="City"
                                                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-[#C4932C] outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="State"
                                                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-[#C4932C] outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="number"
                                                placeholder="Postal code"
                                                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-[#C4932C] outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16">
                                    <h2 className="text-xl font-bold text-gray-800">Payment method</h2>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-start gap-x-3">
                                            <div className="flex justify-center items-center">
                                                <input
                                                    type="radio"
                                                    className="w-5 h-5 cursor-pointer accent-[#a07822]"
                                                    id="visa"
                                                    name="paymentMethod"
                                                    checked={paymentMethod === "visa"}
                                                    onChange={() => handleCardSelection("https://readymadeui.com/images/visa.webp", "visa")}
                                                />
                                                <label htmlFor="visa" className="ml-4 flex gap-2 cursor-pointer">
                                                    <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="Visa Card" />
                                                </label>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <input
                                                    type="radio"
                                                    className="w-5 h-5 cursor-pointer accent-[#a07822]"
                                                    id="amex"
                                                    name="paymentMethod"
                                                    checked={paymentMethod === "amex"}
                                                    onChange={() => handleCardSelection("https://readymadeui.com/images/american-express.webp", "amex")}
                                                />
                                                <label htmlFor="amex" className="ml-4 flex gap-2 cursor-pointer">
                                                    <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="American Express Card" />
                                                </label>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <input
                                                    type="radio"
                                                    className="w-5 h-5 cursor-pointer accent-[#a07822]"
                                                    id="master"
                                                    name="paymentMethod"
                                                    checked={paymentMethod === "master"}
                                                    onChange={() => handleCardSelection("https://readymadeui.com/images/master.webp", "master")}
                                                />
                                                <label htmlFor="master" className="ml-4 flex gap-2 cursor-pointer">
                                                    <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="MasterCard" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-8 mt-8">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Cardholder's Name"
                                                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-[#C4932C] outline-none"
                                            />
                                        </div>

                                        <div className="flex justify-center items-center bg-white border-b focus-within:border-[#C4932C] overflow-hidden">
                                            <img src={selectedCard} className="w-max h-5" alt="Selected Card" />
                                            <input
                                                required
                                                type="text"
                                                value={cardNumber}
                                                placeholder="Card Number"
                                                className="px-2 py-1 bg-white text-gray-800 w-full text-sm outline-none ml-2"
                                                onChange={handleChange}
                                                maxLength="19"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    maxLength="7"
                                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-[#C4932C] outline-none"
                                                    onInput={(e) => {
                                                        let value = e.target.value;
                                                        value = value.replace(/\D/g, '');


                                                        if (value.length > 2) {
                                                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                                        }


                                                        const [month, year] = value.split('/');


                                                        if (month && month.length === 2) {
                                                            const monthNumber = parseInt(month, 10);
                                                            if (monthNumber > 12) {
                                                                value = '12/' + (year || '');
                                                            }
                                                        }


                                                        if (year && year.length === 2) {
                                                            const yearNumber = parseInt(year, 10);
                                                            if (yearNumber > 24) {
                                                                value = month + '/24';
                                                            }
                                                        }
                                                        e.target.value = value;
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    required
                                                    type="number"
                                                    placeholder="CVV"
                                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-[#C4932C] outline-none"
                                                    maxLength={3}
                                                    onInput={(e) => {
                                                        e.target.value = e.target.value.slice(0, 3);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                required
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 shrink-0 text-[#C4932C] accent-[#a07822] border-gray-300 rounded"
                                            />
                                            <label htmlFor="remember-me" className="ml-3 block text-sm">
                                                I accept the
                                                <a
                                                    href="#"
                                                    className="text-[#C4932C] font-semibold hover:underline ml-1"
                                                    onClick={handleTermsClick}
                                                >
                                                    Terms and Conditions
                                                </a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 my-8">
                                    <a href="/">
                                        <button
                                            type="button"
                                            className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                        >
                                            Back
                                        </button>
                                    </a>
                                    <button
                                        type="submit"
                                        className="min-w-[150px] px-6 py-3.5 text-sm bg-[#C4932C] text-white rounded-lg hover:bg-[#a07822]"
                                    >
                                        Confirm payment {totalSum} $
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 rounded-lg overflow-hidden">
                            <div className="relative h-full">
                                <div className="px-5 overflow-auto max-lg:max-h-[400px] lg:h-[calc(100vh-60px)] max-lg:mb-8">
                                    <h2 className="text-xl font-bold text-gray-800 mt-2">Order Summary</h2>
                                    {uniqueArray.map(product => {
                                        const quantityObject = basketQuantity.find(item => item[product.id]);
                                        const quantity = quantityObject ? quantityObject[product.id] : 1;

                                        return (
                                            <div className="space-y-8 mt-8" key={product.id}>
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="lg:max-w-[120px] xl:max-w-[140px] max-w-[140px] p-5 shrink-0 bg-gray-200 rounded-lg">
                                                        <img src={product.productPic} className="w-full object-contain" alt="Product 2" />
                                                    </div>
                                                    <div className="w-full flex flex-col justify-between">
                                                        <h3 className="text-start text-gray-800 font-bold">{product.title}</h3>
                                                        <ul className="text-sm text-gray-800 space-y-1 mt-1 w-full">
                                                            <div className='flex items-center justify-between'>
                                                                <span className="pr-2">Quantity</span>
                                                                <div className='flex items-center gap-1'>
                                                                    <li className="flex flex-wrap gap-4">
                                                                        {product.quantity}
                                                                    </li>
                                                                </div>
                                                            </div>
                                                            <li className="flex flex-wrap gap-4">
                                                                Price <span className="ml-auto">{product.price * quantity} $</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>


                                <div className="px-5 lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full py-4">
                                    <h4 className="flex flex-wrap gap-4 text-base text-gray-800 font-bold">
                                        Total <span className="ml-auto">{totalSum} $</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};




export default Checkout;








