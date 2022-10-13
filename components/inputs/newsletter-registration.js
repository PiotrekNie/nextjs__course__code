import { useRef, useState } from "react";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [status, setStatus] = useState(null);
  const emailInputRef = useRef();

  function formSubmitHandler(ev) {
    ev.preventDefault();

    const email = emailInputRef.current.value;

    const reqBody = {
      email: email,
    };

    fetch("api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 409) setStatus("exists");
        if (response.status === 201) setStatus("success");

        return response.json();
      })
      .then((data) => console.log(data));
  }

  function hideMessage(message, time) {
    setTimeout(() => setStatus(null), time);

    return message;
  }

  return (
    <section className={classes.newsletter}>
      <h2> Sign up to stay updated!</h2>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your e-mail"
            ref={emailInputRef}
            required
          />
          <button type="submit">Register</button>
        </div>
        {status && (
          <p>
            {status === "exists"
              ? "E-mail exists!"
              : hideMessage("Success! E-mail signed up!", 3000)}
          </p>
        )}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
