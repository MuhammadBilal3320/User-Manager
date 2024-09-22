import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; // Import Yup for validation
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Define validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
    });

    const userLogin = async (values) => {
        try {
            const response = await toast.promise(
                axios.post(
                    `${import.meta.env.VITE_REAL_HOST_URL}/auth/loginUser`,
                    {
                        email: values.email,
                        password: values.password,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ),
                {
                    pending: 'Logging in...',
                    success: 'Login successful!',
                    error: {
                        render({ data }) {
                            return data.response?.data?.message || 'Login failed!';
                        },
                    },
                },
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
    
            // Log the entire response to inspect its structure
            console.log('Response from server:', response);
    
            const { data } = response;


            console.log(data)
    
            if (data.success) {
                localStorage.setItem('token', data.authToken);
                setTimeout(() => {
                    toast.success("Login successful!");
                    navigate("/home");
                }, 700);
            } else {
                console.error("Token not found in the response.");
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
        }
        
    };
    
    return (
        <RegistrationMain>
            <div className="welcomeBack">
                <h4>Welcome Back! </h4>
                <h4>Good to See You Again! </h4>
            </div>
            <RegistrationContainer>
                <div className="upperText">
                    <h3>USER MANAGER</h3>
                    <h1>SIGN IN</h1>
                    <p>Enter your credentials to access the account.</p>
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}  // Attach the validation schema
                    onSubmit={(values) => {
                        userLogin(values);
                    }}
                >
                    {({ values, errors, touched }) => (
                        <Form>
                            <div className="FormContainer">

                                <div className={`inputContainer ${values.email ? 'filled' : ''}`}>
                                    <label htmlFor='email'>Email</label>
                                    <Field className="inputField" name="email" type="email" />
                                    {errors.email && touched.email ? (
                                        <div className="error text-red-600 ml-5 text-sm">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className={`inputContainer ${values.password ? 'filled' : ''}`}>
                                    <label htmlFor='password'>Password</label>
                                    <Field className="inputField" name="password" style={{ paddingRight: "45px" }} type={showPassword ? "text" : "password"} />
                                    <div className="input-eyes">
                                        {showPassword ? <IoIosEye onClick={() => setShowPassword(false)} fontSize={"25px"} /> : <IoIosEyeOff onClick={() => setShowPassword(true)} fontSize={"25px"} />}
                                    </div>
                                    {errors.password && touched.password ? (
                                        <div className="error text-red-600 ml-5 text-sm">{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className='signUpButton'>
                                    <StyledWrapper>
                                        <button className="button" type="submit">
                                            <p>LOG IN</p>
                                        </button>
                                    </StyledWrapper>
                                </div>

                                <div className="alreadyAccount text-[18px] mt-5 w-[100%] flex justify-center" >
                                    Create New Account? <Link to={'/registration'}><b className='text-[#00dfc0] ml-2'> Sign up</b></Link>
                                </div>

                            </div>
                        </Form>
                    )}
                </Formik>
            </RegistrationContainer>

            <SideContainer>
                <div className="sideSide">
                    <h1>Welcome Back! Good to See You Again!</h1>
                    <p>We're glad to see you again. Please log in to continue where you left off and access your account. Your saved data and personalized settings are just a step away!</p>
                    <img src="./images/lock.gif" width={"100px"} alt="this is gif" />
                    <h3>PROTECT YOURSELF</h3>
                </div>
            </SideContainer>
            <ToastContainer style={{ width: "360px" }} position="top-right" />
        </RegistrationMain>
    );
};

export default Login;


const RegistrationMain = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    width: 100%;

    @media screen and (max-width: 900px) {
        flex-direction: column;
        gap: 30px;
        justify-content: center;
    }

    h4{
            display: none;
            font-size: 25px;
            font-weight: 800;
            text-align: center;
            color: rgb(0, 223, 192);
            @media screen and (max-width: 900px) {
            display: block;
    }
        }


`;

const RegistrationContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    border-radius: 20px;
    background-color: whitesmoke;
    box-shadow: rgb(0, 223, 192) 0 0 6px 2px;
    padding: 50px;

    @media screen and (max-width: 768px) {
        box-shadow: none;
        width: 100%;
        padding: 5px;
        background-color: white;
    }



    .upperText{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        width: 80%;
        text-align: center;
        
    }

    h3{
        font-size: 30px;
        font-weight: 800;
        color: black;
        letter-spacing: 5px;
        @media screen and (max-width: 768px) {
            font-size: 25px;
        }
    }

    h1 {
        font-size: 40px;
        font-weight: 800;
        color: #00dfc0;
        @media screen and (max-width: 768px) {
            font-size: 40px;
        }
    }

    p {
        font-size: 18px;
        color: #3d5855cf;

        @media screen and (max-width: 768px) {
            font-size: 16px;
        }
    }

    .inputField {
        position: relative;
        z-index: 10;
        max-width: 400px;
        min-width: 310px;
        width: 400px;
        padding: 10px;
        border-radius: 10px;
        border: 2px solid gray;
        outline: none;
        font-size: 20px;
        font-weight: 500;
        transition: border-color 0.3s ease-in-out;
        background-color: transparent;
        &:focus{
            border: 3px solid #00dfc0;
        }

        @media screen and (max-width: 400px) {
            width: 350px;
        }
    }

    .inputContainer {
        position: relative;
    }

    label {
        transition: all 0.3s;
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 20px;
        font-weight: 500;
        z-index: 2;
        pointer-events: none;
        color: #00dfc0;
    }

    .inputContainer.filled label,
    .inputContainer:focus-within label {
        position: absolute;
        z-index: 20;
        transform: translateY(-22px);
        font-size: small;
        background-color: whitesmoke;
        border-radius: 20px;
        padding: 2px 8px;
        color: black;
    }

    .FormContainer{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .input-eyes{
        position: absolute;
        top: 13px;
        right: 10px;
        z-index: 30;
        cursor: pointer;
    }

    .signUpButton{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        cursor: pointer;
    }

`

const StyledWrapper = styled.div`
.button {
all: unset;
display: flex;
align-items: center;
position: relative;
padding: 0.2em 3em;
border: #00dfc0 solid 0.15em;
border-radius: 1em;
color: #00dfc0;
font-size: 1.5em;
font-weight: 800;
cursor: pointer;
overflow: hidden;
transition: border 300ms, color 300ms;
user-select: none;
}

.button p {
z-index: 1;
}

.button:hover {
color: #212121;
}

.button:active {
border-color: #00dfc0;
}

.button::after, .button::before {
content: "";
position: absolute;
width: 9em;
aspect-ratio: 1;
background: mediumspringgreen;
opacity: 50%;
border-radius: 50%;
transition: transform 500ms, background 300ms;
}

.button::before {
left: 0;
transform: translateX(-8em);
}

.button::after {
right: 0;
transform: translateX(8em);
}

.button:hover:before {
transform: translateX(-0em);
}

.button:hover:after {
transform: translateX(0em);
}

.button:active:before,
.button:active:after {
background: teal;
}
`;

const SideContainer = styled.div`
    background-color: #00dfc0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30%;
    height: 100vh;
    box-shadow: 0 0 8px 1px black;
    @media screen and (max-width: 950px) {
        display: none;
    }

    .sideSide{
        height: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column; 
        width: 90%;



        h1{
            font-size: 40px;
            font-weight: 700;
            color: white;
            text-align: center;

        }

        p{
            font-size: 18px;
            color: #000000;
            text-align: center;

        }

        h3{
            font-size: 30px;
            font-weight: 800;
            color: #000000;
            text-align: center;

        }
    }
    `