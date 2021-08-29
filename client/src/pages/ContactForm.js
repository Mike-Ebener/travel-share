import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

emailjs.init("service_7xzl6sv");

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const serviceId = 'service_7xzl6sv'
  const templateId = 'template_awm21nn'
  const userId = 'user_DhtOShBTTF4cGzXEN8lBe'
  
  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast('Form Sent', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast'
    });
  };
  
  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { username, email, message } = data;
    console.log('Name: ', username);
    console.log('Email: ', email);

    console.log('Message: ', message);
    try {
      const templateParams = {
        username,
        email,

        message
      };
      
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        userId
      );

      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='ContactForm'>
         <script type = "text/javascript" src= "https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js">
      </script>
      <script type="text/javascript">
          (function(){
              emailjs.init("user_DhtOShBTTF4cGzXEN8lBe")
          })
      </script>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
              <div>
                  If you have any problems please send a message below
                  
              </div>
              <br></br>
            <div className='contactForm'>
              <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
       
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      {...register('username', {
                        required: { value: true, message: 'Please enter your name' },
                        maxLength: {
                          value: 30,
                          message: 'Please use 30 characters or less'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Name'
                    ></input>
                    {errors.username && <span className='errorMessage'>{errors.username.message}</span>}
                  </div>
                  <div className='col-6'>
                    <input
                      type='email'
                      name='email'
                      {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                      })}
                      className='form-control formInput'
                      placeholder='Email address'
                    ></input>
                    {errors.email && (
                      <span className='errorMessage'>Please enter a valid email address</span>
                    )}
                  </div>
                </div>
       
                
                <div className='row formRow'>
                  <div className='col'>
                    <textarea
                      rows={10}
                      name='message'
                      {...register('message', {
                        required: true
                      })}
                      className='form-control formInput'
                      placeholder='Message'
                    ></textarea>
                    {errors.message && <span className='errorMessage'>Please enter a message</span>}
                  </div>
                </div>
                <button className='submit-btn' type='submit'>
                  Submit
                </button>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;