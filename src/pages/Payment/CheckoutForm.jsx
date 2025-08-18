import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ clientSecret, price, period }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCardError('');
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card
      });

      if (error) {
        setCardError(error.message);
        setLoading(false);
        return;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id
      });

      if (confirmError) {
        setCardError(confirmError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        const minutes = parseInt(period); // 1, 720, 1440
        const durationMs = minutes * 60 * 1000;

        const premiumUntil = new Date(Date.now() + durationMs);
        // console.log('Premium until:', premiumUntil);

        await axiosSecure.patch(`/users/premium/${user.email}`, {
          premiumExpiresAt: premiumUntil
        });

        Swal.fire('Success!', 'Subscription successful.', 'success');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Payment failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border bg-base-100 dark:bg-gray-200 rounded-md" />
      {cardError && <p className="text-red-500">{cardError}</p>}
      <button type="submit" className="btn btn-primary w-full" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
