import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSupabase } from '../hooks/useSupabase';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { supabase } = useSupabase();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('Order ID is missing.');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, supabase]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Loading Order Details...</h1>
        <p>Please wait while we retrieve your order information.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p>There was an error fetching your order: {error}</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 block">Go to Homepage</Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Order Not Found</h1>
        <p>The order with ID {orderId} could not be found.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 block">Go to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Order Confirmed!</h1>
      <p className="text-lg mb-4">Thank you for your purchase. Your order has been successfully placed.</p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Total Price:</strong> ${order.total_price.toFixed(2)}</p>
        <p><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>
        <p><strong>Payment Method:</strong> <span className="capitalize">{order.payment_method}</span></p>
        <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
        <p>{order.shipping_address.fullName}</p>
        <p>{order.shipping_address.addressLine1}</p>
        {order.shipping_address.addressLine2 && <p>{order.shipping_address.addressLine2}</p>}
        <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zipCode}</p>
        <p>{order.shipping_address.country}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Items Ordered</h2>
        {order.items && order.items.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {order.items.map((item: any, index: number) => (
              <li key={index} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">Product ID: {item.product_id}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found for this order.</p>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;