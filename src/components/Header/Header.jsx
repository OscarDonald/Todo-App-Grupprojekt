// Ikoner som inte riktigt matchar i tjocklek
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

import './Header.css'
import Dropdown from "../Dropdown/Dropdown";
import { useState } from 'react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState('')

    // Går inte att klicka mellan knapparna då båda togglar show
    // Går inte att stänga genom att klicka utanför
    const handleClick = (e, mode) => {
        setMode(mode);
        setIsOpen(prev => !prev)
    }

    return (
        <header>
            <h1 className="header__title">Todo App</h1>
            <div className="header__nav__container">
                <nav className="header__nav">
                    <ul className="header__ul">
                        <li 
                            className="header__li"
                            onClick={() => handleClick('add')}
                        >
                            <AiOutlinePlusCircle className="header__icons add"/>
                        </li>
                        <li 
                            className="header__li"
                            onClick={(e) => handleClick(e, 'profile')}
                        >
                            <FaRegArrowAltCircleDown className="header__icons arrow" style={{rotate: mode === 'profile' && isOpen ? '90deg' : '0deg'}}/>
                        </li>
                    </ul>
                </nav>
                {isOpen && <Dropdown mode={mode}/>}
            </div>
        </header>

    )
}