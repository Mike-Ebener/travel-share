import React, {useState} from 'react';


const ContactForm = () => {
    const [status, setStatus] = useState("Submit")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const sendingMessage = alert('sending')
        setStatus(sendingMessage)
        const {username, email, message} = e.target.elements;
        let details = {
            username: username.value,
            email: email.value,
            message: message.value
        };
        let response = await fetch("https:localhost:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });
        const submitMessage = alert('Submit')
        setStatus(submitMessage)
        let results = await response.json();
        alert(results.status)
    };

    return(
        <form onSubmit= {handleSubmit}>
            <div>
                <label htmlFor="username"> Username:</label>
                <input type = "text" id="username" required/>
            </div>
            <div>
                <label htmlFor="email"> Email:</label>
                <input type = "text" id = "email" required/>
            </div>
            <div>
                <label htmlFor="message"> Message:</label>
                <input type = "message" id="message" rows="5" required/>
            </div>
            <button type="submit" >{status}</button>
        </form>
    )
    
};

export default ContactForm;


