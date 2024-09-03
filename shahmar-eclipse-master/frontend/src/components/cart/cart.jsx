import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { addBasketQuantity, setBasketItems } from "../../features/basketSlice.js";

const Cart = (props) => {
    const dispatch = useDispatch();
    const basketData = useSelector((state) => state.counter.basketItems);
    const [productQuantities, setProductQuantities] = useState({});
    const loggedInData = useSelector((state) => state.wishList.loggedIn)
    const cartRef = useRef();

    useEffect(() => {
        const storedBasketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
        const initialQuantities = {};
        storedBasketItems.forEach((product) => {
            initialQuantities[product.id] = product.quantity || 1;
        });
        setProductQuantities(initialQuantities);
        localStorage.setItem('basketItems', JSON.stringify(basketData));

    }, [basketData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                props.closeCart();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props]);

    

    const updateLocalStorage = (updatedBasketData) => {
        localStorage.setItem('basketItems', JSON.stringify(updatedBasketData));
    };

    const incrementQuantity = (productId) => {
        setProductQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            const updatedBasketData = basketData.map((item) =>
                item.id === productId
                    ? { ...item, quantity: (newQuantities[productId] || 1) + 1 }
                    : item
            );
            dispatch(setBasketItems(updatedBasketData));
            updateLocalStorage(updatedBasketData);
            return { ...newQuantities, [productId]: (newQuantities[productId] || 1) + 1 };
        });
    };

    const decrementQuantity = (productId) => {
        setProductQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            const newQuantity = Math.max((newQuantities[productId] || 1) - 1, 0);
            let updatedBasketData;
            if (newQuantity === 0) {
                delete newQuantities[productId];
                updatedBasketData = basketData.filter((item) => item.id !== productId);
            } else {
                updatedBasketData = basketData.map((item) =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                );
            }
            dispatch(setBasketItems(updatedBasketData));
            updateLocalStorage(updatedBasketData);
            return newQuantities;
        });
    };

    const uniqueArray = basketData.filter((product) => productQuantities[product.id] !== undefined);

    const totalSum = uniqueArray.reduce((sum, item) => sum + item.price * (productQuantities[item.id] || 0), 0);

    function checkoutFn() {
        if (loggedInData) {
            localStorage.setItem('basketItems', JSON.stringify(basketData));
            dispatch(addBasketQuantity(productQuantities));
        }
        else {
            window.location.href = '/register';
        }
    }

    return (
        <div>
            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div ref={cartRef} className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="rounded-lg flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="relative -m-2 p-2 text-gray-400 duration-200 hover:text-[#C4932C]"
                                                    onClick={() => props?.closeCart()}
                                                >
                                                    <span className="absolute -inset-0.5"></span>
                                                    <span className="sr-only">Close panel</span>
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {uniqueArray.map((product) => (
                                                        <li className="flex py-6" key={product.id}>
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    src={product.productPic}
                                                                    alt="Product"
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col justify-between">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <a href="#">{product.title}</a>
                                                                        </h3>
                                                                        <p className="ml-4">{product.price} $</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex flex-col w-max text-start">
                                                                        <p className="text-sm text-gray-500">Case: {product.coverCase}</p>
                                                                        <p className="text-sm text-gray-500">Waterproof: {product.waterProof}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                                                </div>
                                                                <div className="flex items-end justify-between">
                                                                    <p className="text-gray-500">Quantity</p>
                                                                    <div className="flex items-center gap-1">
                                                                        <button
                                                                            className="cursor-pointer rounded items-center font-bold text-xl border justify-center duration-100 text-[#C4932C]"
                                                                            onClick={() => incrementQuantity(product.id)}
                                                                        >
                                                                            <IoMdArrowDropup />
                                                                        </button>
                                                                        <div className="flex flex-wrap gap-4">
                                                                            {productQuantities[product.id] || 0}
                                                                        </div>
                                                                        <button
                                                                            className="cursor-pointer rounded items-center font-bold text-xl border justify-center duration-100 text-[#C4932C]"
                                                                            onClick={() => decrementQuantity(product.id)}
                                                                        >
                                                                            <IoMdArrowDropdown />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>{totalSum}$</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping calculated at checkout.</p>
                                        <div  onClick={() => props?.closeCart()} className="mt-6">
                                            <Link  to="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-[#C4932C] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#a07822] duration-200" onClick={() => checkoutFn()}>Checkout</Link>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or <button type="button" className="font-medium duration-200 text-[#C4932C] hover:text-[#a07822]" onClick={() => props.closeCart()}>Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
