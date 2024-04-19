import { useState } from "react";
import { removeColumn, moveColumn, copyColumn } from "../../feature/columnSlice/columnSlice";
import { useDispatch } from "react-redux";

export default function ColumnSettings({column}) {
    const dispatch = useDispatch();
    const [activeColumn, setActiveColumn] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if(isOpen){
            setActiveColumn(null)
            setIsOpen(prev => !prev)
        } else {
            setActiveColumn(column.id)
            setIsOpen(prev => !prev)
        }
    }

    return (
        <div className='settings-menu'>
            <button className='settings-button' onClick={handleClick}>
                ⋮
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