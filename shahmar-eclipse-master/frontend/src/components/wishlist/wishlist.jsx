import { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { resetWishListItems, addWishListItem } from "../../features/wishlistSlice";
import { increment } from "../../features/basketSlice.js";

const Wishlist = () => {
    const wishListData = useSelector((state) => state.wishList.wishListItems);
    const dispatch = useDispatch();

    const [uniqueArray, setUniqueArray] = useState(() => {
        return wishListData.reduce((acc, current) => {
            if (!acc.find(item => item._id === current._id)) {
                acc.push(current);
            }
            return acc;
        }, []);
    });

    const removeItemById = (id) => {
        setUniqueArray(prevArray => {
            const updatedArray = prevArray.filter(item => item._id !== id);
            localStorage.setItem('wishListItems', JSON.stringify(updatedArray));
            return updatedArray;
        });

        dispatch(resetWishListItems());
        uniqueArray.forEach(item => {
            if (item._id !== id) {
                dispatch(addWishListItem(item));
            }
        });
    };

    const deleteAllWishlist = () => {
        setUniqueArray([]);
        localStorage.setItem('wishListItems', JSON.stringify([]));
        dispatch(resetWishListItems());
    };

    return (
        <div>
            <div className="px-5 my-10 sm:px-0 sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] mx-auto w-full relative flex justify-center items-center">
                <div className="flex flex-col justify-start items-start">
                    <div className="text-center w-full">
                        <h2 className="text-3xl font-extrabold text-gray-800 inline-block pb-1">Favourites</h2>
                    </div>
                    <div className="mt-10 lg:mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 lg:gap-y-0">
                        {uniqueArray.map((item, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="relative overflow-hidden">
                                    <img
                                        className="w-[100vw] rounded-lg hover:scale-105 duration-200 cursor-pointer"
                                        src={item.productPic}
                                        alt="product"
                                    />
                                    <button
                                        aria-label="close"
                                        className="rounded-md top-4 right-4 absolute text-xl text-red-500"
                                    >
                                        <FaHeart onClick={() => removeItemById(item._id)} />
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="flex justify-center items-center">
                                        <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">
                                            {item.title}
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                    </div>
                                </div>
                                <div className="flex flex-col justify-start items-start mt-5">
                                    <div>
                                        <p className="tracking-tight text-xs leading-3 text-gray-800">{item.category}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
                                            WaterProof: {item.stock && item.stock[0]?.waterProof}
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
                                            Case material: {item.stock && item.stock[0]?.coverCase}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
                                            {item.price} $
                                        </p>
                                    </div>
                                    <div className="flex justify-between flex-col lg:flex-row items-center mt-5 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                        <div className="w-full">
                                            <button
                                                onClick={() => dispatch(increment(item))}
                                                className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-[#a07822] duration-200 rounded-lg bg-[#C4932C]"
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 lg:mt-12 flex justify-start items-center w-full">
                        {/* <button className="focus:outline-none dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 hover:bg-gray-700 w-full sm:w-auto tracking-tight py-4 text-base leading-4 text-white bg-gray-800 border border-gray-800">
                            Load more
                        </button> */}
                    </div>
                </div>
            </div>
            <button
                className='focus:outline-none font-semibold focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white px-5 tracking-tight py-4 text-lg leading-4 hover:bg-[#933b3b] duration-200 rounded-lg bg-[#e03737]'
                onClick={() => deleteAllWishlist()}
            >
                Remove All
            </button>
        </div>
    );
};

export default Wishlist;
