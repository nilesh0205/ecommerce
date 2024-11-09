import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

// const stripePromise = loadStripe(
//   "pk_test_51P8b67SGE0pQzSKCIeYeH2LL6EyfRY0tgWtgL4cBNUt73piG1GaQIqIXjRRct7gQiUbb0SfXkEmEzgqxf3wK2xXz007wBk3gOL"
// );

const CheckoutAllFormField = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create a PaymentIntent directly on the client-side
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        "pk_test_51P8b67SGE0pQzSKCIeYeH2LL6EyfRY0tgWtgL4cBNUt73piG1GaQIqIXjRRct7gQiUbb0SfXkEmEzgqxf3wK2xXz007wBk3gOL",
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
          amount: 1000, // Amount in cents
          currency: "usd",
        }
      );

      if (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      } else {
        console.log(paymentIntent);
        // Payment was successful
        setError(null);
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Card details
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </label>
        </div>
        <button type="submit" disabled={loading || success}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>Payment successful!</div>}
    </div>
  );
};

export default CheckoutAllFormField;
