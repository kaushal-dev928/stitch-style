import {
  createPaymentAPI,
  verifyPaymentAPI,
  paymentFailedAPI,
} from "../api/paymentAPI";
import toast from "react-hot-toast";

export const openRazorpay = async ({
  orderId,
  amount,
  name,
  phone,
  email,
  onSuccess,
}) => {
  try {
    // Backend se Razorpay order banao
    const res = await createPaymentAPI({ orderId });
    const { razorpayOrderId, key } = res.data;

    const options = {
      key,
      amount: amount * 100,
      currency: "INR",
      name: "Stitch & Style",
      description: "Custom cloth order",
      order_id: razorpayOrderId,

      // ✅ Payment success
      handler: async (response) => {
        try {
          await verifyPaymentAPI({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          });
          toast.success("Payment successful! 🎉");
          if (onSuccess) onSuccess();
        } catch {
          toast.error("Payment verification failed");
        }
      },

      prefill: {
        name,
        contact: phone,
        email,
      },

      theme: {
        color: "#D4537E",
      },

      // ✅ Payment failed
      modal: {
        ondismiss: async () => {
          await paymentFailedAPI({ orderId });
          toast.error("Payment cancelled");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    toast.error("Payment start nahi hua — try again");
    console.error(err);
  }
};
