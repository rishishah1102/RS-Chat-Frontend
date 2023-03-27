import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import axios from 'axios';
import app from '../Utils/firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Select, countryCode } from '../Components/Select';
import Logo from '../Images/RS-Chat-Logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);
let i = 0;
let cc = "";
let phoneNumber;

function Login() {
    const Navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('rschattoken')) {
            Navigate('/Chat');
        } else {
            Navigate('/');
        }
    }, [Navigate]);

    const [num, setNum] = useState('');
    const [showVerify, setShowVerify] = useState(true);
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleOtpField = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    function handleChange(e) {
        setNum(e.target.value);
    }

    function handleClick(e) {
        e.preventDefault();

        if (num) {
            onSignInSubmit();
        }
        else {
            toast.warning("Invalid Number");
        }
    }

    function reCaptchaVerifier() {

        window.recaptchaVerifier = new RecaptchaVerifier('recaptchaContainer', {
            'size': 'invisible',
            'callback': (response) => {
                console.log("You are inside the recaptcha verifiier");
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    }

    function onSignInSubmit() {
        reCaptchaVerifier();
        while (countryCode.charAt(i) !== " ") {
            cc += countryCode.charAt(i);
            i++;
        }
        phoneNumber = cc + num;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setShowVerify(false);
            }) //sms sent & change ui
            .catch((error) => {
                toast.error("Message is not sent!");
            });
    }

    function onConfirm() {
        let enteredOtp = otp.join("");
        const code = enteredOtp;
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            // const user = result.user;
            toast.success("Verificaton Done!");
            const mobileNumber = {
                phoneNumber: cc + num
            };
            axios.post('https://rschat-backend.onrender.com/', mobileNumber)
                .then((response) => {
                    localStorage.setItem("rschattoken", response.data.token);
                    if (response.data.message === "User Already exists") {
                        toast.success("Successfully Logged-In")
                        setTimeout(() => {
                            Navigate('/chat');
                        }, 3000);
                    }
                    else {
                        toast.success("Successfully Registered");
                        setTimeout(() => {
                            Navigate('/profile');
                        }, 3000);
                    }
                })
                .catch((err) => {
                    toast.error("Server is down, Please try again later!");
                });
            // ...
        }).catch((error) => {
            toast.error("Invalid Otp");
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    return (
        <div className='login'>

            <div id="recaptchaContainer"></div>

            <div className="loginContainer">

                <div className="logo">
                    <img src={Logo} alt="Logo" />
                    <h1>RS-Chat</h1>
                </div>

                <div className="loginText">
                    <h2>Sign-In</h2>
                    <p><strong>Hey Enter your details to get sign-in your account</strong></p>
                </div>
                {showVerify ?
                    <div className="container">
                        <Select />
                        <input type="number" name='mobno' onChange={handleChange} placeholder="Phone No" />
                        <button type='submit' onClick={handleClick}>Proceed</button>
                    </div>
                    :
                    <div className='container'>
                        <div className="otpBox">
                            {otp.map((data, index) => {
                                return (
                                    <input
                                        className="otpInput"
                                        type="text"
                                        name="otp"
                                        maxLength="1"
                                        key={index}
                                        value={data}
                                        onChange={e => handleOtpField(e.target, index)}
                                        onFocus={e => e.target.select()}
                                    />
                                );
                            })}
                        </div>
                        <button className="otpButton" onClick={onConfirm}>Verify OTP</button>
                    </div>
                }
            </div>
            <ToastContainer position='bottom-right' theme="colored" />
        </div>
    );
};

export default Login;