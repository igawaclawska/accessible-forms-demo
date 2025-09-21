import { useState } from "react";

export default function FormAccessibilityPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Added email field
    tickets: "",
    comments: "",
    track: "",
    contact: "",
    accepted: false,
  });

  const handleChange = (field) => (e) => {
    const value = field === "accepted" ? e.target.checked : e.target.value;
    setFormData((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation & aria-live announcements if needed
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <>
      <header>
        <h1>Event Registration</h1>
        <p>
          Please fill out the form below to register for the event. Fields
          marked with * are required.
        </p>
      </header>
      <main>
        <section aria-labelledby="registrationFormTitle">
          <h2 id="registrationFormTitle" className="sr-only">
            Registration Form
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Text input */}
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange("name")}
              autoComplete="name"
              required
            />

            {/* Email input */}
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              autoComplete="email"
              required
            />

            {/* Numeric field */}
            <label htmlFor="tickets">Number of Tickets (1–10)</label>
            <input
              id="tickets"
              type="number"
              min="1"
              max="10"
              value={formData.tickets}
              onChange={handleChange("tickets")}
              required
            />

            {/* Long textfield */}
            <label htmlFor="comments">
              Special Requests / Accessibility Needs
            </label>
            <textarea
              id="comments"
              rows={5}
              value={formData.comments}
              onChange={handleChange("comments")}
              aria-describedby="commentsHelp"
            />
            <p id="commentsHelp">Optional. Max 500 characters.</p>

            {/* Select */}
            <label htmlFor="track">Event Track</label>
            <select
              id="track"
              value={formData.track}
              onChange={handleChange("track")}
              required
            >
              <option value="">--Please select--</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="design">Design</option>
            </select>

            {/* Radiogroup */}
            <fieldset>
              <legend>Preferred Contact Method</legend>
              <div>
                <input
                  type="radio"
                  id="email"
                  name="contact"
                  value="email"
                  checked={formData.contact === "email"}
                  onChange={handleChange("contact")}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="phone"
                  name="contact"
                  value="phone"
                  checked={formData.contact === "phone"}
                  onChange={handleChange("contact")}
                />
                <label htmlFor="phone">Phone</label>
              </div>
            </fieldset>

            {/* Checkbox */}
            <div>
              <input
                id="terms"
                type="checkbox"
                checked={formData.accepted}
                onChange={handleChange("accepted")}
                required
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>

            {/* Submit Button */}
            <button type="submit">Submit Registration</button>
          </form>
        </section>
      </main>
    </>
  );
}
