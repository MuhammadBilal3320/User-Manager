import { useState } from 'react';
import ManagerContext from './Context.jsx'

const UseState = (props) => {

    const [mainData, setMainData] = useState([]);
    const [activeComponent, setActiveComponent] = useState('My Vault'); 
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "white");
    const [leftSlider, setLeftSlider] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createButton, setCreateButton] = useState(false);
    const [editButton, setEditButton] = useState(false);
    const [selectedData, setSelectedData] = useState({id:"", title:"", emailOrUser:"", password:"", message:""})

    return (
        <ManagerContext.Provider value={{
        mainData, setMainData,
        activeComponent, setActiveComponent,
        theme, setTheme, 
        leftSlider, setLeftSlider, 
        editModal, setEditModal, 
        createButton, setCreateButton,
        editButton, setEditButton,
        selectedData, setSelectedData
        }}>
            {props.children}
        </ManagerContext.Provider>
        
    )
}

export default UseState
