// Tillgång till isOpen-state här för att kunna stänga på klick
// Lägg till ta bort knapp på användarna och binda till färdiga funktionen i slicen
import './Dropdown.css'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, chooseUser, removeUser } from '../../feature/userSlice/userSlice';
import { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";


const Dropdown = ({mode}) => {
    const [username, setUsername] = useState('');
    const {users} = useSelector(state => state.users)
    const dispatch = useDispatch();

    // Förhindra uppdatering
    // Lägg till användarnamn till users
    // Nollställ state
    const handleNewUser = (e) => {
        e.preventDefault();
        dispatch(addUser(username))
        setUsername('');
    }


    // Returnerar dropdown meny med conditional rendering för innehåll beroende på om man klickat på 'lägg till användare'
  return (
    <div className="dropdown">
        {mode === 'add' ? (
            <form className='user__form' onSubmit={handleNewUser}>
                <label className='user__label' htmlFor="">Your Name:</label>
                <input 
                    className='user__input'
                    type="text" 
                    placeholder='Full name...'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className='submit__button' type='submit'>Submit!</button>
            </form>
        ) : (
            <>
                {users.map(user => (
                    
                    <div 
                        key={user.id}
                        onClick={() => dispatch(chooseUser(user.id))}
                        style={{backgroundColor: user.isLoggedIn ? 'lightblue' : '#cccccc'}}
                        className='dropdown__user'
                    ><h3 className='dropdown__title'>{user.name}</h3>
                    <div className='dropdown__delete'><FaRegTrashCan className='delete__icon' onClick={() => dispatch(removeUser(user.id))}/></div>
                    </div> 
                    
                ))} 
            </>
        )}
    </div>
  )
}

export default Dropdown
