import React, { useContext } from 'react'
import styled from 'styled-components'
import ManagerContext from './context/Context'


const HomeEditModal = () => {

    const {editModal} = useContext(ManagerContext);

    return (
        <EditModalContainer editModal={editModal}>
sadsa
        </EditModalContainer>
    )
}

export default HomeEditModal

const EditModalContainer = styled.div`
    position: relative;
    top: 0;
    right: 0;
    transform: translateY(100%)${(props)=> props.editModal ? "flex" : "none"};
    transition: all 0.3s ease-in-out;
    width: 700px;
    height: 900px;
    background-color: red;
    display: ${(props)=> props.editModal ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    `
