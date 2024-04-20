import { useState, useEffect, useRef } from "react";
import { removeColumn, moveColumn, copyColumn } from "../../feature/columnSlice/columnSlice";
import { useDispatch } from "react-redux";
import { CiSettings } from "react-icons/ci";
import './ColumnSettings.css'


export default function ColumnSettings({column}) {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);

    const [activeColumn, setActiveColumn] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Function to open and close settings menu on click and only in correct column
    const handleClick = () => {
        if(isOpen){
            setActiveColumn(null)
            setIsOpen(prev => !prev)
        } else {
            setActiveColumn(column.id)
            setIsOpen(prev => !prev)
        }
    }
    
    // Function to detect click outside menu
    // If detected modal is closed and active column reset
    // Cleanup function removes eventlisteners to prevent them stacking
    // Dependency array of wrapperRef
    // IIFE to initiate on load with wrapper ref as parameter
    (function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setActiveColumn(null);
              setIsOpen(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    })(wrapperRef)

    return (
        <div className='settings-menu' ref={wrapperRef}>
            <button className='settings-button' onClick={handleClick}>
                <CiSettings className="settings__icon"/>
            </button>
            {isOpen && activeColumn === column.id && (
                <ul className='settings-options'>
                    <li onClick={() => dispatch(removeColumn(column.id))}>Delete list</li>
                    <li onClick={() => dispatch(moveColumn({id: column.id, direction: 'left'}))}>Move left</li>
                    <li onClick={() => dispatch(moveColumn({id: column.id, direction: 'right'}))}>Move right</li>
                    <li onClick={() => dispatch(copyColumn(column.id))}>Copy list</li>
                </ul>
            )}
        </div>
    )
}