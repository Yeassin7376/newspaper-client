import { useSearchParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const [searchParams] = useSearchParams();
  const price = searchParams.get('price');
  const period = searchParams.get('duration');
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!price || !period) {
      navigate('/subscription');
      return;
    }
console.log('Price:', price, 'Period:', period);

    const fetchClientSecret = async () => {
      try {
        const res = await axiosSecure.post('/create-payment-intent', {
          price: parseFloat(price),
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error('Failed to create payment intent:', err);
      }
    };

    fetchClientSecret();
  }, [price, period, axiosSecure, navigate]);

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 my-10 bg-white rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Confirm Payment</h2>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm  clientSecret={clientSecret} price={price} period={period} />
      </Elements>
    </div>
  );
};

export default Payment;
