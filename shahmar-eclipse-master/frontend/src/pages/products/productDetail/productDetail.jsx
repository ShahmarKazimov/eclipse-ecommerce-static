import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { increment } from "../../../features/basketSlice";
import { Link } from 'react-router-dom';
import { addWishListItem, removeWishListItem } from "../../../features/wishlistSlice";

const ProductDetail = ({ product, onClose }) => {
    const dispatch = useDispatch();
    const wishListItems = useSelector(state => state.wishList.wishListItems);

    const handleCloseClick = () => {
        onClose();
    };

    const toggleWishlist = (product) => {
        if (wishListItems.some(item => item.id === product.id)) {
            dispatch(removeWishListItem(product.id));
        } else {
            dispatch(addWishListItem(product));
        }
    };

    return (
        <div className="detail-overlay -mt-5 sm:mt-0 relative z-[5]">
            <div className="detail-card sm:p-6 px-5 pb-2 pt-4 sm:w-[78%] w-[90%] sm:block flex flex-col">
                <nav className='detail-nav flex justify-between items-center pb-2'>
                    <svg
                        className="arrow cursor-pointer"
                        version="1.1"
                        viewBox="0 0 512 512"
                        width="24px"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        onClick={handleCloseClick}
                    >
                        <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256" stroke="#727272" />
                    </svg>
                    <button onClick={onClose} className="back-button">Back to all Products</button>
                    <button aria-label="wishlist" className="text-sm sm:text-xl" onClick={() => toggleWishlist(product)}>
                        {wishListItems.some(item => item.id === product.id) ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
                    </button>
                </nav>
                <div className="detail-photo sm:w-[50%] w-[50%] mx-auto">
                    <img className="detail-image mx-auto" src={product.productPic} alt={product.title} />
                </div>
                <div className="detail-description flex flex-col justify-between pt-2 sm:pt-4 sm:h-[227px] pb-2 sm:w-[50%] mx-auto sm:border-l sm:border-t-0 border-t sm:mt-0 sm:px-5">
                    <h2 className='detail-text-2'>{product.title}</h2>
                    <h4 className='detail-text-4'>{product.category}</h4>
                    <span className='detail-text-4'>Case: {product.coverCase}</span>
                    <span className='detail-text-4'>WaterProof: {product.waterProof}</span>
                    <h1 className='sm:text-[23px] text-[18px]'>${product.price}</h1>
                    <p className='detail-paragraph pb-2'>
                        {product.description}
                    </p>
                    <div className="detail-buttons flex gap-1 justify-between">
                        <button onClick={() => dispatch(increment(product))} className='detail-button bg-[#C4932C] text-sm whitespace-nowrap text-[white] hover:bg-[#a07822] sm:text-medium'>Add to Cart</button>
                        <Link to="/wishlist">
                            <button className='detail-button bg-[#C4932C] text-sm whitespace-nowrap text-[white] hover:bg-[#a07822] sm:text-medium'>Wishlist</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
