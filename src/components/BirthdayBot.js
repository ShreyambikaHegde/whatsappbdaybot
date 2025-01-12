import React, { useState } from "react";
import { scheduleMessage } from "../services/api";

const BirthdayBot = () => {
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await scheduleMessage(formData);
      setResponseMessage(response.message);
    } catch (error) {
      setResponseMessage("Error: " + error);
    }
  };

  return (
    <div>
      <h1>WhatsApp Birthday Bot</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your birthday message"
            required
          />
        </div>
        <div>
          <label>Hour:</label>
          <input
            type="number"
            name="hour"
            value={formData.hour}
            onChange={handleChange}
            placeholder="0-23"
            required
          />
        </div>
        <div>
          <label>Minute:</label>
          <input
            type="number"
            name="minute"
            value={formData.minute}
            onChange={handleChange}
            placeholder="0-59"
            required
          />
        </div>
        <div>
          <label>Second:</label>
          <input
            type="number"
            name="second"
            value={formData.second}
            onChange={handleChange}
            placeholder="0-59"
            required
          />
        </div>
        <button type="submit">Schedule Message</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default BirthdayBot;
