import React from 'react';
import banner from '../assets/bannner.jpg';
import bannerMobile from '../assets/mobile.banner.jpg';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { Link, useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    console.log(id, cat);
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;

    navigate(url);
    console.log(url);
  };

  return (
    <section className="bg-white">
      {/* Banner Section */}
      <div className="container mx-auto">
        <div
          className={`w-full h-64 lg:h-96 bg-blue-100 rounded mb-4 ${!banner && 'animate-pulse'}`}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block object-cover"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full lg:hidden object-cover"
            alt="banner"
          />
        </div>
      </div>

      {/* Categories Grid Section */}
      <div className="container mx-auto px-4 my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loadingCategory ? (
          new Array(10).fill(null).map((_, index) => (
            <div
              key={index + 'loadingcategory'}
              className="bg-white rounded-lg p-4 min-h-36 grid gap-4 shadow animate-pulse"
            >
              <div className="bg-blue-100 min-h-24 rounded"></div>
              <div className="bg-blue-100 h-8 rounded"></div>
            </div>
          ))
        ) : (
          categoryData.map((cat, index) => (
            <div
              key={cat._id + 'displayCategory'}
              className="relative w-full h-full group cursor-pointer"
              onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
            >
              <img
                src={cat.image}
                className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
                alt={cat.name}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {cat.name}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Category Products Display */}
      <div>
        {categoryData?.map((c, index) => (
          <CategoryWiseProductDisplay
            key={c?._id + 'CategorywiseProduct'}
            id={c?._id}
            name={c?.name}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
