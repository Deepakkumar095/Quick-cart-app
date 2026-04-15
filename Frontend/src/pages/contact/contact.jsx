import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //validation
    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill in all fields");
      return;
    }

    setLoading(true);

    emailjs.send(
      "service_o68gpv4",
      "template_6usttsa",
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message.replace(/\n/g, "<br>")
      },
      "ZCKofaV7V6mQzhguG"
    ).then(() => {
      setStatus("Message sent successfully");
      setForm({ name: "", email: "", message: "" });

    }).catch((error) => {
      console.log("EmailJS Error:", error);
      setStatus("Failed to send message. Please try again.");
    }).finally(() => {
      setLoading(false);
    })

  };

  return (
    <div className="contactPage">

      {/* Header */}
      <div className="contactHeader">
        <p className="subTitle">Contact Us</p>
        <h1>Get In Touch</h1>
        <p className="desc">We do love to hear from you</p>
      </div>

      {/* Form */}
      <div className="contactContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <textarea
            placeholder="Your Message..."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
          <p>{status}</p>
        </form>
      </div>
    </div>
  );
};