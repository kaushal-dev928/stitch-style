const sendWhatsApp = (phone, message) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  console.log("📲 WhatsApp Link:", url);
};

module.exports = sendWhatsApp;
