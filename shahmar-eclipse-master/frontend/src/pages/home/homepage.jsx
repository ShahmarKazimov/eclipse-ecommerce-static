import React, { useState, useEffect } from 'react';
import './homepage.css';
import PopularBrands from '../popularBrands/popularBrands';
import { LuCheckCheck } from "react-icons/lu";
import Products from '../products/products';
import Reviews from '../../components/reviews/reviews'

const slides = [
  {
    id: 1,
    title: 'ROLEX',
    description: 'Elegant and Stylish Watches to Make Every Moment Special.',
    imageUrl: 'https://www.cjcharles.com/cdn/shop/articles/Best_Rolex_Watches_of_All_Time.jpg?v=1695979209'
  },
  {
    id: 2,
    title: 'HAMILTON',
    description: 'Embrace the Future, Capture Every Moment.',
    imageUrl: 'https://www.hamiltonwatch.com/media/wysiwyg/1_12.jpg'
  },
  {
    id: 3,
    title: 'CARTIER',
    description: 'Timeless Style and Precise Time Management.',
    imageUrl: 'https://blog.bernierobbins.com/wp-content/uploads/2016/08/hp_calibre-diver.jpg'
  },
  {
    id: 4,
    title: 'HUBLOT',
    description: 'Reliable and Stylish Watches Leading You to the Future.',
    imageUrl: 'https://images.lacotedesmontres.com/mesIMG/imgHD/54639.jpg'
  },
  {
    id: 5,
    title: 'ULYSSE NARDIN',
    description: 'Art and Excellence in Every Tick.',
    imageUrl: 'https://hairspring.com/wp-content/uploads/2024/01/Hero-3216-scaled.jpg'
  }
];

const homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className="slider relative -top-[180px] ">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`myslide ${index === currentSlide ? 'fade' : ''}`}
            style={{ display: index === currentSlide ? 'block' : 'none' }}
          >
            <div className="txt">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <button className="learn-more mt-2">
                <span className="top-[2px] circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <a href='watches' className="button-text">Learn More</a>
              </button>
            </div>
            <img className='slide-image' src={slide.imageUrl} alt={slide.title} style={{ width: '100%', height: '100%' }} />
          </div>
        ))}
        <div className="dotsbox" style={{ textAlign: 'center' }}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className='w-full'>
        <h2 className="text-3xl font-bold inline-block mb-9">Popular Brands</h2>
        <div>
          <PopularBrands />
        </div>
      </div>
      <div className="my-24 sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] mx-auto">
        <h2 id="a11y-buyer-c24-usp-heading" className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-10">
          The Leading Marketplace for Luxury Watches Since 2024
        </h2>
        <ul className="flex flex-wrap justify-center gap-4 text-center">
          <li className="w-full md:w-[49%] lg:w-[24%] mb-[1%]">
            <div className="border border-gray-300 rounded-lg p-6 h-full">
              <img src="https://static.chrono24.com/images/default/illustrations/buyer-rating.svg" alt="" width="90" height="90" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">4.8 out of 5 stars</h3>
              <p>from 159,000 reviews worldwide</p>
            </div>
          </li>
          <li className="w-full md:w-[49%] lg:w-[24%] mb-[1%]">
            <div className="border border-gray-300 rounded-lg p-6 h-full">
              <img src="https://static.chrono24.com/images/default/illustrations/love-my-watch.svg" alt="" width="90" height="90" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">9 million</h3>
              <p>watch enthusiasts use Eclipse each month</p>
            </div>
          </li>
          <li className="w-full md:w-[49%] lg:w-[24%] mb-[1%]">
            <div className="border border-gray-300 rounded-lg p-6 h-full">
              <img src="https://static.chrono24.com/images/default/illustrations/handshake.svg" alt="" width="90" height="90" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Over 200,000</h3>
              <p>customers choose Eclipse Protection annually</p>
            </div>
          </li>
          <li className="w-full md:w-[49%] lg:w-[24%] mb-[1%]">
            <div className="border border-gray-300 rounded-lg p-6 h-full">
              <img src="https://static.chrono24.com/images/default/illustrations/dealer.svg" alt="" width="90" height="90" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">More than 25,000</h3>
              <p>trustworthy sellers</p>
            </div>
          </li>
        </ul>
      </div>
      <div className='sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] mx-auto lg:flex-row flex flex-col'>
        <div className='relative rounded-s-lg flex gap-5 flex-col justify-between text-left pl-5 py-12 text-white bg-[#03181C] lg:w-[50%] h-[470px]'>
          <h1 className='text-3xl font-semibold pb-2'>Eclipse Protection</h1>
          <div className='flex items-center gap-3'>
            <span className='text-green-600'><LuCheckCheck /></span>
            <h2>Payment via the Escrow Service</h2>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-green-600'><LuCheckCheck /></span>
            <h2>Commitment to Authenticity</h2>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-green-600'><LuCheckCheck /></span>
            <h2>Global money-back guarantee</h2>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-green-600'><LuCheckCheck /></span>
            <h2>Strict dealer guidelines</h2>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-green-600'><LuCheckCheck /></span>
            <h2>Insured shipments</h2>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-green-600'><LuCheckCheck /></span>
            <h2>Eclipse's quality & security team</h2>
          </div>
          <a href='/security'>
            <button className='button-87 text-sm'>Learn more about security</button>
          </a>
        </div>
        <div className='rounded-e-lg protect-wallpaper lg:w-[50%] h-[470px] '>
        </div>
      </div>
      <div className='mt-24 sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] mx-auto'>
        <Products />
      </div>
      <h2 className="text-3xl font-bold inline-block mb-10">What Our Clients Say</h2>
      <div className='bg-[#F6F2EE] rounded-lg p-5 py-12 w mx-auto'>
        <Reviews />
      </div>
      <section>
        <div className="my-24 sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] mx-auto">
          <h2 className="text-2xl font-bold inline-block mb-10 sm:text-3xl">Important Facts & Figures</h2>
          <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 sm:px-5">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">20</h2>
              <p className="text-[14px] text-center sm:text-[16px]">years as the leading marketplace for watches</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">44,000</h2>
              <p className="text-[14px] text-center sm:text-[16px]">trustworthy sellers from over 120 countries</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">200,000</h2>
              <p className="text-[14px] text-center sm:text-[16px]">customers choose Buyer Protection annually</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">9,000,000</h2>
              <p className="text-[14px] text-center sm:text-[16px]">website visitors monthly</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">600,000</h2>
              <p className="text-[14px] text-center sm:text-[16px]">listings covering a wide range</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">6,550,000</h2>
              <p className="text-[14px] text-center sm:text-[16px]">satisfied app users</p>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 right-4">
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="bg-[#C4932C] font-bold text-white px-3 py-[7px] rounded-full shadow-xl hover:bg-[#a07822] transition duration-300"
          >
            ⇱
          </button>
        )}
      </div>
    </div>
  );
};

export default homepage;
