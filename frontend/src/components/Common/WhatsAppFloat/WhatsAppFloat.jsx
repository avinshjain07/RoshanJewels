/**
 * WhatsApp Floating Button — fixed position, matches the existing HTML element.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=918224998809&text=Hello%20Roshan%20Jewels%2C%20I%20would%20like%20to%20know%20more%20about%20your%20jewellery%20collection"
      className="whatsapp-float"
      target="_blank"
      rel="noreferrer"
      title="Chat with us on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
