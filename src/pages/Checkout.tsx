import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useSupabase } from '../hooks/useSupabase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout: React.FC = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { supabase } = useSupabase();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError('You must be logged in to place an order.');
      setLoading(false);
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        user_id: user.id,
        total_price: getTotalPrice(),
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        status: 'pending',
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (orderError) throw orderError;

      if (paymentMethod === 'stripe') {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to load.');

        const response = await fetch(`${import.meta.env.VITE_SUPABASE_EDGE_FUNCTIONS_URL}/create-stripe-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            amount: Math.round(getTotalPrice() * 100), // amount in cents
            order_id: order[0].id,
            customer_email: user.email,
          }),
        });

        const session = await response.json();

        if (session.error) throw new Error(session.error);

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) throw result.error;
      } else {
        // Handle other payment methods or direct order placement
        clearCart();
        navigate(`/order-confirmation/${order[0].id}`);
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Order placement error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="addressLine1" className="block text-gray-700 text-sm font-bold mb-2">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={shippingAddress.addressLine1}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="addressLine2" className="block text-gray-700 text-sm font-bold mb-2">Address Line 2 (Optional)</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={shippingAddress.addressLine2}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-xl font-bold">${getTotalPrice().toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Payment Method</h3>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="stripe"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === 'stripe'}
                onChange={() => setPaymentMethod('stripe')}
                className="mr-2"
              />
              <label htmlFor="stripe" className="text-gray-700">Credit Card (Stripe)</label>
            </div>
            {/* Add other payment methods here if needed */}
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <button
            onClick={handlePlaceOrder}
            disabled={loading || cart.length === 0}
            className={`mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ${loading || cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;