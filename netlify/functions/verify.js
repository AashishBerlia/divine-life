const crypto = require("crypto");

exports.handler = async (event) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  JSON.parse(event.body);

  const secret = process.env.RAZORPAY_SECRET;

  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false })
    };
  }
};
