import React, { useContext } from 'react'
import styled from 'styled-components'
import ManagerContext from './context/Context'
import { Formik, Form, Field } from 'formik';
import { RiCloseCircleFill } from "react-icons/ri";


const HomeEditModal = () => {

    const { theme, editModal, setEditModal } = useContext(ManagerContext);

    return (
        <EditModalContainer theme={theme} editModal={editModal}>
            <div className="modalContainer">
                <div className="closeButton w-[100%] flex justify-end p-3 cursor-pointer ">
                    <RiCloseCircleFill onClick={()=> setEditModal(false)} className='hover:scale-105' fontSize={"2rem"} color={theme === "white" ? "#1d2a35" : "white"} />
                </div>
                <Formik>
                    <Form>
                        
                        <div className="titleInput flex flex-col">
                            <label htmlFor="title" className='text-[18px] ml-3 text-gray-500 font-semibold'>Title</label>
                            <Field name="title" type="text" className="bg-transparent border-[1px] border-black focus:border-black focus:border-2 focus:outline-none  rounded-md p-3" />
                        </div>

                    </Form>
                </Formik>
            </div>
        </EditModalContainer>
    )
}

export default HomeEditModal

const EditModalContainer = styled.div`

overflow: hidden;
position: relative;
right: 0;
bottom: 0;
background-color: transparent;
width: ${(props) => props.editModal ? "600px" : "0px"};
transition: width 0.5s;
height: 750px;
border-radius: 20px;

.modalContainer{
    padding: 10px;
    position: absolute;
    z-index: 30;
    bottom: 0;
    right: 0;
    width: 100%;
    transition: all 0.4s ease-in-out;
    transform: ${(props) => props.editModal ? "translateY(0%)" : "translateY(100%)"};
    height: 750px;
    background-color: ${props => props.theme === "white" ? "aliceblue" : "#1d2a35"};
    color: ${props => props.theme === "white" ? "black" : "white"};
    border-radius: 20px;
}
    
    `
