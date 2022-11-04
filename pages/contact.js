import Head from "next/head";
import ContactForm from "../components/contact/contact-form";

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me Your messages!" />
      </Head>
      <ContactForm />
    </>
  );
}

export default ContactPage;
