

import '../App.css';
import instaImage from '../instagram.svg';
import { useForm, ValidationError } from '@formspree/react';
import fbImage from '../facebook.svg';
import gmailImage from '../gmail.svg';

function ContactMe() {
    const [state, handleSubmit] = useForm(process.env.REACT_APP_FORMSPREE_KEY);
    if (state.succeeded) {
        return (
            <h1 className='headerThanks'>Thanks for your message!</h1>
        );
    }
 

  return (
    <div className='ContactContainer'>
     
      <h1>Connect with me on:</h1>
      <ul>
        <li>
          <img src={instaImage} className='imagineContact' alt='' srcSet='' />
          <a href='https://www.instagram.com/grn.pics/'>Instagram</a>
        </li>
        <li>
          <img src={fbImage} className='imagineContact' alt='' srcSet='' />
          <a href='https://www.facebook.com/GRN.pics'>Facebook</a>
        </li>
        <li>
          <img src={gmailImage} className='imagineContact' alt='' srcSet='' />
          <a href='mailto:allexaphotography@gmail.com'>Email</a>
        </li>
      </ul>
      <h2>or</h2>
      <h1>Send me a message </h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">
       Your Email Address:
      </label><br/>
      <input
        id="email"
        type="email" 
        name="email" required maxLength={70}
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      /><br/>
      <label htmlFor="message">
        Your Message:
      </label>
      <textarea
        id="message"
        name="message" required  maxLength={600}
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button className="buttonGeneric" type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
    </div>
  );
}

export default ContactMe;
