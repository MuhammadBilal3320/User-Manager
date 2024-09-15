import { useState } from 'react';
import ManagerContext from './Context.jsx'

const UseState = (props) => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || "white");
    const [leftSlider, setLeftSlider] = useState(false);
    const [editModal, setEditModal] = useState(false);

    return (
        <ManagerContext.Provider value={{theme, setTheme, leftSlider, setLeftSlider, editModal, setEditModal}}>
            {props.children}
        </ManagerContext.Provider>
        
    )
}

export default UseState
