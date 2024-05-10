// Ikoner som inte riktigt matchar i tjocklek
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import styles from './Header.module.css'
import Dropdown from "../Dropdown/Dropdown";
import { useState } from 'react'
import TaskList from "../TaskList/TaskList";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('');

    const handleClick = (mode) => {
        setMode(mode);
        setIsOpen(prev => !prev)
    }

    return (
        <header>
            <div className={styles.header__logo__container}>
                <img src="../../image/logo.png" alt="Ants dragging a donut that says 'GBG est. 2023'" className={styles.header__logo}/>
            </div>
            <h1 className={styles.header__title}>Todo App</h1>
            <div className={styles.header__nav__container}>
                <nav className={styles.header__nav}>
                    <ul className={styles.header__ul}>
                        <li>
                            <TaskList />
                        </li>
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