import React, { useState } from 'react';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('cod'); // Default to 'cod'

  return (
    <section>
      {/* Container */}
      <div className="max-padd-container">
        <div className="max-padd-container py-10 bg-white rounded-2xl my-6">
          <form className="flex flex-col xl:flex-row gap-20 xl:gap-28">
            {/* Delivery Information */}
            <div className="flex flex-1 flex-col gap-3 text-[20px]">
              <h3 className="font-bold">Delivery Information</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                required
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip code"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2"
                />
              </div>
            </div>
            {/* Cart Total */}
            <div className="flex flex-1 flex-col">
              <CartTotal />
              {/* Payment Method */}
              <div className="my-6">
                <h3 className="font-bold mb-5">
                  Payment <span className="text-secondary">Method</span>
                </h3>
                <div className="flex gap-3">
                  {/* Online Payment Button */}
                  <button
                    type="button"
                    onClick={() => setMethod('online')}
                    className={`btn-light !py-1 ${
                      method === 'online' ? 'text-secondary !font-bold' : ''
                    }`}
                  >
                    Online Payment
                  </button>
                  {/* Cash on Delivery Button */}
                  <button
                    type="button"
                    onClick={() => setMethod('cod')}
                    className={`btn-light !py-1 ${
                      method === 'cod' ? 'text-secondary !font-bold' : ''
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>
              <div >
              <button
                type="button"
                onClick={() => navigate('/orders')}
                className="btn-secondary"
              >
                Place Order
              </button>
            </div>
            </div>
            
          </form>
          
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default PlaceOrder;
