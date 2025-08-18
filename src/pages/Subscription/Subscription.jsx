import { useState } from 'react';
import { useNavigate } from 'react-router';
import bannerImg from '../../assets/subscribe-now.jpg'; // Replace with your own image

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { label: '1 Minute', value: 1, price: 10 },
    { label: '5 Days', value: 5 * 24 * 60, price: 300 },
    { label: '10 Days', value: 10 * 24 * 60, price: 500 },
  ];

  const handleSubscribe = () => {
    if (!selectedPlan) return;
    navigate(`/payment?duration=${selectedPlan.value}&price=${selectedPlan.price}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Banner */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
        <img src={bannerImg} alt="Subscription Banner" className="object-cover w-full h-full" />
        
      </div>

      {/* Subscription Form */}
      <div className="bg-base-200 p-8 shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-bold">Choose Your Subscription Plan</h2>

        {/* Dropdown */}
        <select
          onChange={(e) =>
            setSelectedPlan(plans.find((p) => p.value === parseInt(e.target.value)))
          }
          defaultValue=""
          className="select select-bordered w-full"
        >
          <option disabled value="">Select Subscription Duration</option>
          {plans.map((plan) => (
            <option key={plan.value} value={plan.value}>
              {plan.label} - ${plan.price}
            </option>
          ))}
        </select>

        {/* Pricing Details */}
        {selectedPlan && (
          <div className="text-lg font-medium">
            You selected: <span className="font-bold">{selectedPlan.label}</span><br />
            Price: <span className="text-primary font-bold">${selectedPlan.price}</span>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleSubscribe}
          disabled={!selectedPlan}
          className="btn btn-primary"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Subscription;
