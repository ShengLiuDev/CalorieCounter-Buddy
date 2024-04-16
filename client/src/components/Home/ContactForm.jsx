import { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);
    console.log("we have not entered the sendEmail portion of the code yet");
    const sendEmail = (e) => {
        console.log("we have entered the sendEmail portion of the code");
        e.persist();
        e.preventDefault();
        setIsSubmitting(true);

        emailjs
            .sendForm(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                e.target,
                process.env.REACT_APP_PUBLIC_KEY
            )
            .then(
                (result) => {
                    setStateMessage('Message Sent!');
                    setIsSubmitting(false);
                    setTimeout(() => {
                        setStateMessage(null);
                    }, 5000); // hides the message after 5 seconds
                },
                (error) => {
                    setStateMessage('Something went wrong, please try again later');
                    setIsSubmitting(false);
                    setTimeout(() => {
                        setStateMessage(null);
                    }, 5000); // same functinality of hiding message
                }
            );
        e.target.reset();
    }
    
    return (
        <div className='contact-us-header'>
            Contact Us
            <hr></hr>
            <div className='contact-us-subtext'>
            <br></br>
                Need to get in touch with us? Either fill out this form 
                or send us an email at <space></space> 
                <span className='our-email'>
                    caloriecounterbuddy@gmail.com
                </span>
            </div>
            <div className='contact-us-information'>
                <form onSubmit={sendEmail} className='contact-us-form'>
                    <label>
                        First Name:
                        <input type="text" firstName="first-name"/>
                    </label>
                    <label>
                        Last Name:
                        <input type="text" lastName="last-name"/>
                    </label>
                    <label> 
                        Email:
                        <input type="text" email="email"/>
                    </label>
                    <label>
                        Message
                        <textarea name="message" className='message-box'/>
                    </label>
                    <input type="submit" value="Send" disabled={isSubmitting} />
                    {stateMessage && <p>{stateMessage}</p>}
                </form>
            </div>
        </div>
    )
};

export default ContactForm;