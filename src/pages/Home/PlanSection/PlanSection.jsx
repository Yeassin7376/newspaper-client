import { useNavigate } from "react-router";


const PlanSection = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/subscription');
  };

  return (
    <section className="bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold mb-10">Choose Your Plan</h2>
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 md:w-3/4 mx-auto">
          {/* Free Plan */}
          <div className="border rounded-lg p-8 shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-primary mb-4">Free Plan</h3>
            <p className="text-4xl font-bold mb-6 text-primary">৳0 / month</p>
            <ul className="space-y-3 mb-6">
              <li>✅ Read all public articles</li>
              <li>✅ Submit articles for review</li>
              <li>❌ Access premium articles</li>
              <li>❌ Ad-free experience</li>
              <li>❌ Priority support</li>
            </ul>
            <button onClick={handleNavigate} className="btn btn-outline btn-primary w-full">
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border rounded-lg p-8 shadow-lg bg-primary dark:bg-base-300 text-white relative">
            <div className="absolute top-0 right-0 bg-accent text-white text-xs px-3 py-1 rounded-bl-lg">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
            <p className="text-4xl font-bold mb-6">৳299 / month</p>
            <ul className="space-y-3 mb-6">
              <li>✅ Read all articles (public + premium)</li>
              <li>✅ Submit articles for review</li>
              <li>✅ Access to premium-only content</li>
              <li>✅ Ad-free experience</li>
              <li>✅ Priority support</li>
            </ul>
            <button onClick={handleNavigate} className="btn btn-white text-primary w-full">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
