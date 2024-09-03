import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";
import ProductDetail from '../products/productDetail/productDetail';
import "./products.scss";
import myData from '../../data.js';
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { increment } from "../../features/basketSlice.js";
import { Link } from "react-router-dom";
import { addWishListItem, removeWishListItem } from "../../features/wishlistSlice.js";

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productsData, setProductsData] = useState([]);
    const [displayAll, setDisplayAll] = useState(false);
    const productsPerPage = 8;

    const dispatch = useDispatch();
    const wishListItems = useSelector(state => state.wishList.wishListItems);

    useEffect(() => {
        const loadProducts = () => {
            setProductsData(myData);
        };

        loadProducts();
    }, []);

    const toggleWishlist = (product) => {
        if (wishListItems.some(item => item.id === product.id)) {
            dispatch(removeWishListItem(product.id));
        } else {
            dispatch(addWishListItem(product));
        }
    };

    const openProductDetail = (product) => {
        setSelectedProduct(product);
    };

    const closeProductDetail = () => {
        setSelectedProduct(null);
    };

    const productsToDisplay = displayAll ? productsData : productsData.slice(0, productsPerPage);

    return (
        <div className='sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] my-10 mx-auto'>
            <div className={selectedProduct ? "blurred" : ""}>
                <div className="flex flex-col justify-between items-center">
                    <div className="text-center w-full">
                        <h2 className="text-3xl font-bold inline-block">Watches</h2>
                    </div>
                    <div className="w-full mt-10 mb-7">
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {productsToDisplay.length === 0 ? (
                                    <p className="mx-auto col-span-4 text-center text-lg text-gray-500">No products found</p>
                                ) : (
                                    productsToDisplay.map(product => (
                                        <div key={product.id} className="flex flex-col">
                                            <div className="relative">
                                                <div className="bg-white shadow-md rounded-lg duration-500 hover:shadow-xl border overflow-hidden">
                                                    <div>
                                                        <div className='cursor-pointer overflow-hidden flex justify-center items-center w-full '>
                                                            <img src={product.productPic} alt="Product" className="hover:scale-105 duration-500 object-cover lg:w-full sm:w-40 w-28" />
                                                        </div>
                                                        <div className="cursor-auto px-5">
                                                            <p className="sm:text-lg text-xs font-bold text-black truncate block capitalize">{product.title}</p>
                                                            <span className="text-gray-400 mr-3 uppercase text-xs">{product.category}</span>
                                                            <div className="flex items-center">
                                                                <p className="sm:text-lg text-xs font-semibold text-black cursor-auto my-2">${product.price}</p>
                                                                <div className="ml-auto flex gap-2 items-center">
                                                                    <button onClick={() => openProductDetail(product)} aria-label="view" className="text-md sm:text-2xl">
                                                                        <HiOutlineEye />
                                                                    </button>
                                                                    <button aria-label="wishlist" className="text-sm sm:text-xl" onClick={() => toggleWishlist(product)}>
                                                                        {wishListItems.some(item => item.id === product.id) ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
                                                                    </button>
                                                                    <button className='text-md sm:text-2xl'>
                                                                        <GiShoppingCart onClick={() => dispatch(increment(product))} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            {productsData.length > productsPerPage && (
                                <div className="mt-4 flex justify-center">
                                    <button
                                        className="px-4 py-2 font-semibold border rounded-md bg-[#C4932C] text-white"
                                    >
                                        <Link to="/watches">Display All</Link>
                                    </button>
                                </div>
                            )}
                        </>
                    </div>
                </div>
            </div>
            {selectedProduct && (
                <div className="product-detail-overlay">
                    <ProductDetail product={selectedProduct} onClose={closeProductDetail} />
                </div>
            )}
        </div>
    );
};

export default Products;
