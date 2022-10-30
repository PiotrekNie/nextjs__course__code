import { useRef, useState, useContext } from "react";
import NotificationContext from "../../store/notification-context";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [status, setStatus] = useState(null);
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function formSubmitHandler(ev) {
    ev.preventDefault();

    const email = emailInputRef.current.value;

    const reqBody = {
      email: email,
    };

    notificationCtx.showNotifications({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch("api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        const data = await response.json();
        throw new Error(data.message);
      })
      .then((data) => {
        notificationCtx.showNotifications({
          title: "Success!",
          message: "Successfully registered for newsletter.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotifications({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
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
