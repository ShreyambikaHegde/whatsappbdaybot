import React, { useState } from "react";
import axios from "axios";
// import "./Birthday.css"; 

function Birthday() {
  const [formData, setFormData] = useState({
    to: "",
    message: "",
    hour: "",
    minute: "",
    second: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/send-message/", {
        to: formData.to,
        message: formData.message,
        hour: parseInt(formData.hour, 10),
        minute: parseInt(formData.minute, 10),
        second: parseInt(formData.second, 10),
      });
      setResponseMessage(response.data.message || "Message scheduled successfully!");
    } catch (error) {
      setResponseMessage(
        error.response?.data?.detail || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="birthday-container">
      <h1>Schedule a Birthday Message</h1>
      <form onSubmit={handleSubmit} className="birthday-form">
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="+911234567890"
            required
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your birthday message"
            required
          />
        </div>
        <div className="form-group">
          <label>Time (Hour):</label>
          <input
            type="number"
            name="hour"
            value={formData.hour}
            onChange={handleChange}
            placeholder="0-23"
            min="0"
            max="23"
            required
          />
        </div>
        <div className="form-group">
          <label>Time (Minute):</label>
          <input
            type="number"
            name="minute"
            value={formData.minute}
            onChange={handleChange}
            placeholder="0-59"
            min="0"
            max="59"
            required
          />
        </div>
        <div className="form-group">
          <label>Time (Second):</label>
          <input
            type="number"
            name="second"
            value={formData.second}
            onChange={handleChange}
            placeholder="0-59"
            min="0"
            max="59"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Schedule Message
        </button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default Birthday;
