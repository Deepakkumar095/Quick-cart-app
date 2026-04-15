import "./footer.css";

export const Footer = () => {
  return (
    <div className="footer">

      <div className="footerContainer">

        {/* Left */}
        <div className="footerSection">

          <h2>MyStore</h2>
          <p>Your one-stop shop for trendy products.</p>

        </div>

        {/* Middle */}
        <div className="footerSection">

          <h3>Quick Links</h3>
          <p>Shop</p>
          <p>Cart</p>
          <p>Contact</p>

        </div>

        {/* Right */}
        <div className="footerSection">

          <h3>Contact</h3>
          <p>Email: support@mystore.com</p>
          <p>Phone: +91 1122334466</p>

        </div>

      </div>


      <div className="footerBottom">

        <p>© 2026 MyStore. All rights reserved.</p>
        
      </div>

    </div>
  );
};