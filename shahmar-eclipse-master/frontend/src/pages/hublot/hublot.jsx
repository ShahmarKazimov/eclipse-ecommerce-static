import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";
import ProductDetail from '../products/productDetail/productDetail';
import "./hublot.scss";
import myData from '../../data.js';
import { increment } from "../../features/basketSlice.js";
import { useSelector, useDispatch } from 'react-redux'
import { GiShoppingCart } from "react-icons/gi";
import { addWishListItem, removeWishListItem } from '../../features/wishlistSlice';

const ITEMS_PER_PAGE = 4;

const Hublot = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");

  const dispatch = useDispatch()
  const wishListItems = useSelector(state => state.wishList.wishListItems);

  const loadProducts = () => {
    setProductsData(myData);
    const hublotProducts = myData.filter(product => product.title.toLowerCase().includes('hublot'));
    setProductsData(hublotProducts);
    setFilteredProducts(hublotProducts);
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleSort = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let sortedProducts = [...productsData];

    if (sortOrder === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (searchTerm) {
      sortedProducts = sortedProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    if (category !== "all") {
      sortedProducts = sortedProducts.filter(product =>
        product.category.toLowerCase() === category
      );
    }

    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  }, [sortOrder, searchTerm, productsData, category]);

  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const toggleWishlist = (product) => {
    if (wishListItems.some(item => item.id === product.id)) {
      dispatch(removeWishListItem(product.id));
    } else {
      dispatch(addWishListItem(product));
    }
  };

  return (
    <div className='sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] my-10 mx-auto'>
      <div className={selectedProduct ? "blurred" : ""}>
        <div className="flex flex-col justify-between items-center">
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold inline-block">Hublot</h2>
          </div>
          <div className="mt-4 w-full flex flex-col md:flex-row justify-between gap-5 items-center">
            <div className='flex flex-col md:flex-row gap-5 items-center'>
              <select
                className="cursor-pointer border px-5 py-1 rounded-md"
                value={sortOrder}
                onChange={handleSort}
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <select
                className="cursor-pointer border px-5 py-1 rounded-md"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="all">All Categories</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="border px-5 py-1 rounded-md w-full sm:w-auto md:mb-0"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="w-full mt-10 mb-7">
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {currentProducts.map(product => (
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
                  ))}
                </div>
                <div className="flex justify-center items-center mt-8 gap-4">
                  <button
                    className="px-4 py-2 bg-[#C4932C] hover:bg-[#a07822] duration-300 cursor-pointer text-white font-semibold rounded-md"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className='font-semibold'>Page {currentPage} of {totalPages}</span>
                  <button
                    className="px-4 py-2 bg-[#C4932C] hover:bg-[#a07822] duration-300 cursor-pointer text-white font-semibold rounded-md"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">No products found</p>
            )}
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

export default Hublot;
