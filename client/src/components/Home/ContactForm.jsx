import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Here we pass the form element reference
        emailjs.sendForm(
            'service_iebftmo',
            'template_vr1floi',
            formRef.current, // Pass the form reference here
            'YTk-1A44ReHaqWXnX'
        ).then((response) => {
            setStateMessage('Message Sent!');
            setIsSubmitting(false);
            setTimeout(() => {
                setStateMessage(null);
            }, 5000);
        }, (error) => {
            setStateMessage('Something went wrong, please try again later.');
            setIsSubmitting(false);
            setTimeout(() => {
                setStateMessage(null);
            }, 5000);
        });

        // Reset form fields after submission
        formRef.current.reset();
    };

    return (
        <div className='contact-us-header'>
            Contact Us
            <hr></hr>
            <div className='contact-us-subtext'>
                <br/>
                Need to get in touch with us? Either fill out this form 
                or send us an email at&nbsp;
                <span className='our-email'>
                    caloriecounterbuddy@gmail.com
                </span>
            </div>
            <div className='contact-us-information'>
                <form ref={formRef} onSubmit={sendEmail} className='contact-us-form'>
                    <label>
                        First Name:
                        <input type="text" name="first_name" />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="last_name" />
                    </label>
                    <label> 
                        Email:
                        <input type="text" name="email" />
                    </label>
                    <label>
                        Message:
                        <textarea name="message" className='message-box'/>
                    </label>
                    <input type="submit" value="Send" disabled={isSubmitting} />
                    {stateMessage && <p>{stateMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
