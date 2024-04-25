// Tillgång till isOpen-state här för att kunna stänga på klick
// Lägg till ta bort knapp på användarna och binda till färdiga funktionen i slicen
import states from './Dropdown.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, chooseUser, removeUser } from '../../feature/userSlice/userSlice';
import { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";


const Dropdown = ({ mode }) => {
    const [username, setUsername] = useState('');
    const { users } = useSelector(state => state.users)
    const dispatch = useDispatch();


    const getInitials = (fullName) => {
        const nameParts = fullName.split(' ');
        const initials = nameParts.map(part => part[0]).join('');
        return initials;
    }

    
    // Förhindra uppdatering
    // Lägg till användarnamn till users
    // Nollställ state
    const handleNewUser = (e) => {
        e.preventDefault();
        const initials = getInitials(username);
        dispatch(addUser({ name: username, initials: initials }))
        setUsername('');
    }


    // Returnerar dropdown meny med conditional rendering för innehåll beroende på om man klickat på 'lägg till användare'
    return (
        <div className={states.dropdown}>
            {mode === 'add' ? (
                <form className={states.user__form} onSubmit={handleNewUser}>
                    <label className={states.user__label} htmlFor="">Your Name:</label>
                    <input
                        className={states.user__input}
                        type="text"
                        placeholder='Full name...'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button className={states.submit__button} type='submit'>Submit!</button>
                </form>
            ) : (
                <>
                    {users.map(user => (
                        <div
                            key={user.id}
                            onClick={() => dispatch(chooseUser(user.id))}
                            style={{ backgroundColor: user.isLoggedIn ? 'lightblue' : '#cccccc' }}
                            className={states.dropdown__user}
                        ><h3 className={states.dropdown__title}>{user.name}</h3>
                            <div className={states.dropdown__delete}><FaRegTrashCan className={states.delete__icon} onClick={() => dispatch(removeUser(user.id))} /></div>
                        </div>

                    ))}
                </>
            )}
        </div>
    )
}

export default Dropdown
