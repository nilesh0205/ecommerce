import { useState } from "react";
import PropTypes from "prop-types";
const Checkout = ({ cardDatas }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const formData = new URLSearchParams();

      // Basic session details
      formData.append("payment_method_types[0]", "card");
      formData.append("mode", "payment");
      formData.append("success_url", "http://localhost:5173");
      formData.append("cancel_url", "http://localhost:5173/card");
      // Loop through each product in cardDatas and add it to line_items
      cardDatas.forEach((product, index) => {
        formData.append(`line_items[${index}][price_data][currency]`, "inr");
        formData.append(
          `line_items[${index}][price_data][product_data][name]`,
          product.name
        );
        formData.append(
          `line_items[${index}][price_data][unit_amount]`,
          (product.salePrice * 100).toString()
        ); // salePrice in paise
        formData.append(
          `line_items[${index}][quantity]`,
          product.qty.toString()
        ); // Quantity of the product
      });

      const response = await fetch(
        "https://api.stripe.com/v1/checkout/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer sk_test_51P8b67SGE0pQzSKCNo3BGlKH5lzDGWzAWi1XFz9G6udcINQXOpxD18MmrxPeUjBLGkA6H6vwAaFJaNz8kKa05EsI00fDhhR0q9", // Replace with your actual secret key
          },
          body: formData,
        }
      );

      const session = await response.json();
      console.log("session", session);

      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error("Failed to create Stripe session.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        type="button"
        className="btn btn-primary w-100 mt-3"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

Checkout.propTypes = {
  totalPayAmount: PropTypes.number.isRequired,
  cardDatas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      salePrice: PropTypes.number.isRequired,
      qty: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Checkout;
