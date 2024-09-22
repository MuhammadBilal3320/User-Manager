import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import ManagerContext from './context/Context';
import { Formik, Form, Field } from 'formik';
import { RiCloseCircleFill } from "react-icons/ri";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import axios from 'axios';

const HomeEditModal = () => {
    const { theme, editModal, setEditModal, createButton, editButton, setSelectedData, selectedData, mainData, setMainData } = useContext(ManagerContext);
    const [showPassword, setShowPassword] = useState(false);
    const [visiblePasswordId, setVisiblePasswordId] = useState(null);


    const generateRandomPassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < 15; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };


    // ******************************** CRUD OPERATIONS START ******************************

    // ********************* Creating New Data Card Start ****************************
    const AddHandler = async (values) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:7000/data/createData',
                {
                    title: values?.title || '',
                    emailOrUser: values?.emailOrUser || '',
                    password: values?.password || '',
                    message: values?.message || ''
                },
                {
                    headers: {
                        authToken: `${token}`, // Sending the token as a Bearer token
                        'Content-Type': 'application/json' // Optional, ensures the request is sent as JSON
                    }
                }
            );

            const newData = {
                "title": values.title,
                "emailOrUser": values.emailOrUser,
                "password": values.password,
                "message": values.message

            }

            setSelectedData({ id: "", title: "", emailOrUser: "", password: "", message: "" });
            setMainData(mainData.concat(newData));//-
            setEditModal(false);

        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    // ********************* Creating New Data Card End ****************************

    // ********************* Editing Existing Data Card Start ****************************
    const EditHandler = async (values) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(
                `http://localhost:7000/data/updateData/${values.id}`,
                {
                    title: values?.title || '',
                    emailOrUser: values?.emailOrUser || '',
                    password: values?.password || '',
                    message: values?.message || ''
                },
                {
                    headers: {
                        authToken: `${token}`, // Sending the token as a Bearer token
                        'Content-Type': 'application/json' // Optional, ensures the request is sent as JSON
                    }
                }
            );

            let newData = JSON.parse(JSON.stringify(mainData));
            for (let index = 0; index < newData.length; index++) {
                const element = newData[index];
                if (element._id === values.id) {
                    newData[index].title = values?.title;
                    newData[index].emailOrUser = values?.emailOrUser;
                    newData[index].password = values?.password;
                    newData[index].message = values?.message;
                    break;
                }
            }
            setMainData(newData);
            setEditModal(false);

        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    // ********************* Editing Existing Data Card End ****************************



    // ******************************** CRUD OPERATIONS END ********************************

    return (
        <EditModalContainer theme={theme} editModal={editModal}>
            <div className="modalContainer" onClick={(event) => { event.stopPropagation(); }}>
                <div className="closeButton w-[100%] flex items-center justify-end p-3">
                    <RiCloseCircleFill
                        onClick={() => { setEditModal(false); }}
                        className='hover:scale-105 cursor-pointer'
                        fontSize={"2.2rem"}
                        color={theme === "white" ? "#1d2a35" : "white"}
                    />
                </div>

                <Formik
                    initialValues={{
                        id: selectedData?.id || '',
                        title: selectedData?.title || '',
                        emailOrUser: selectedData?.emailOrUser || '',
                        password: selectedData?.password || '',
                        message: selectedData?.message || ''
                    }}
                    enableReinitialize // Reinitialize form values when selectedData changes
                    onSubmit={(values, { resetForm }) => {  // Add resetForm here
                        if (createButton) {
                            AddHandler(values);
                            setSelectedData({ id: "", title: "", emailOrUser: "", password: "", message: "" });
                            resetForm();  // Reset form fields after submission
                            return;
                        }
                        if (editButton) {
                            EditHandler(values);
                            setSelectedData({ id: "", title: "", emailOrUser: "", password: "", message: "" });
                            resetForm();  // Reset form fields after submission
                            return;
                        }
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className='flex flex-col gap-5'>

                            <div className="titleInput flex flex-col">
                                <label htmlFor="title" className='text-[18px] ml-3 font-semibold'>
                                    Title
                                </label>
                                <Field
                                    readOnly={!createButton && !editButton}
                                    name="title"
                                    placeholder="Title"
                                    type="text"
                                    className={`bg-transparent border-[2px] ${theme === "white" ? "border-black" : "border-white"} focus:border-[2px] focus:border-[#00dfc0] focus:outline-none rounded-md p-3`}
                                />
                            </div>

                            <div className="emailOrUserInput flex flex-col">
                                <label htmlFor="emailOrUser" className='text-[18px] ml-3 font-semibold'>
                                    Email / User Name
                                </label>
                                <Field
                                    readOnly={!createButton && !editButton}
                                    name="emailOrUser"
                                    placeholder="Email or User Name"
                                    type="text"
                                    className={`bg-transparent border-[2px] ${theme === "white" ? "border-black" : "border-white"} focus:border-[2px] focus:border-[#00dfc0] focus:outline-none rounded-md p-3`}
                                />
                            </div>

                            <div className="passwordController flex items-end justify-around">
                                <div className={`passwordInput relative flex flex-col ${createButton || editButton ? "w-[85%]" : "w-[100%]"}`}>
                                    <label htmlFor="password" className='text-[18px] ml-3 font-semibold'>
                                        Password
                                    </label>
                                    <Field
                                        readOnly={!createButton && !editButton}
                                        name="password"
                                        placeholder="••••••••••••"
                                        type={showPassword ? "text" : "password"}
                                        className={`bg-transparent border-[2px] pr-12 ${theme === "white" ? "border-black" : "border-white"} focus:border-[2px] focus:border-[#00dfc0] focus:outline-none rounded-md p-3`}
                                    />
                                    <div className="passwordEyes cursor-pointer absolute right-3 top-10">
                                        {showPassword ? (
                                            <IoIosEye onClick={() => setShowPassword(false)} fontSize={"25px"} />
                                        ) : (
                                            <IoIosEyeOff onClick={() => setShowPassword(true)} fontSize={"25px"} />
                                        )}
                                    </div>
                                </div>
                                <div className={`passwordGenerator ${createButton || editButton ? "flex" : "hidden"}  items-center justify-center`}>
                                    <GiPerspectiveDiceSixFacesRandom
                                        className='cursor-pointer hover:scale-90 active:rotate-180 active:duration-300'
                                        fontSize={"50px"}
                                        onClick={() => setFieldValue('password', generateRandomPassword())} // Generate and set password
                                    />
                                </div>
                            </div>

                            <div className="messageInput flex flex-col">
                                <label htmlFor="message" className='text-[18px] ml-3 font-semibold'>
                                    Message
                                </label>
                                <Field
                                    readOnly={!createButton && !editButton}
                                    name="message"
                                    as="textarea"
                                    placeholder="Message"
                                    rows={7}
                                    className={`bg-transparent border-[2px]  ${theme === "white" ? "border-black" : "border-white"} focus:border-[2px] focus:border-[#00dfc0] focus:outline-none rounded-md p-3 resize-none`}
                                />
                            </div>

                            <div className="create-Edit-Button my-5 flex justify-center items-center flex-col">
                                {createButton && (<button type='submit' className='create-Button bg-[#00dfc0]'>Create</button>)}
                                {editButton && (<button type='submit' className='create-Button bg-[#00dfc0]'>Save</button>)}
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </EditModalContainer>
    );
};

export default HomeEditModal;

const EditModalContainer = styled.div`
    user-select: none;
    overflow: hidden;
    position: relative;
    right: 0;
    bottom: 0;
    background-color: transparent;
    width: ${(props) => props.editModal ? "700px" : "0px"};
    transition: width 0.5s;
    height: 750px;
    border-radius: 20px;


    @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: 730px;
    position: absolute;
    left: 0;
    bottom: ${(props) => props.editModal ? "150px" : "80px"};

    }   

.modalContainer {
    padding: 20px;
    position: absolute;
    z-index: 30;
    bottom: -10px;
    right: 10px;
    width: 95%;
    transition: all 0.4s ease-in-out;
    transform: ${(props) => props.editModal ? "translateY(0%)" : "translateY(100%)"};
    height: 750px;
    background-color: ${props => props.theme === "white" ? "aliceblue" : "#1d2a35"};
    color: ${props => props.theme === "white" ? "black" : "white"};
    border-radius: 20px;
    box-shadow: #0000009d 0px 2px 4px, #00000090 0px 7px 13px -3px, #00000075 0 0 8px 1px inset;
    @media screen and (max-width: 768px) {
    z-index: 50;
    right: 0;
    bottom: 0;
    width: 100%;
    }

    }

    .create-Button{
        width: 180px;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
        font-size: large;
        font-weight: 600;

        &:hover{
            scale: 0.95;
        }
        
    }
`;
