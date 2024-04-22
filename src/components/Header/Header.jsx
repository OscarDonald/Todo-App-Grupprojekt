// Ikoner som inte riktigt matchar i tjocklek
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

import styles from './Header.module.css'
import Dropdown from "../Dropdown/Dropdown";
import { useState } from 'react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState('')

    // Går inte att klicka mellan knapparna då båda togglar show
    // Går inte att stänga genom att klicka utanför
    const handleClick = (mode) => {
        setMode(mode);
        setIsOpen(prev => !prev)
    }

    return (
        <header>
            <h1 className={styles.header__title}>Todo App</h1>
            <div className={styles.header__nav__container}>
                <nav className={styles.header__nav}>
                    <ul className={styles.header__ul}>
                        <li 
                            className={styles.header__li}
                            onClick={() => handleClick('add')}
                        >
                            <AiOutlinePlusCircle className={`${styles.header__icons} ${styles.add}`}/>
                        </li>
                        <li 
                            className={styles.header__li}
                            onClick={() => handleClick('profile')}
                        >
                            <FaRegArrowAltCircleDown className={`${styles.header__icons} ${styles.arrow}`}  style={{rotate: mode === 'profile' && isOpen ? '90deg' : '0deg'}}/>
                        </li>
                    </ul>
                </nav>
                {isOpen && <Dropdown mode={mode}/>}
            </div>
        </header>

    )
}