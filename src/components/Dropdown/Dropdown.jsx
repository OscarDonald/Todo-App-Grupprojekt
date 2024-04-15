import './Dropdown.css'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, chooseUser } from '../../feature/userSlice/userSlice';
import { useState } from 'react';

const Dropdown = ({mode}) => {
    const [username, setUsername] = useState('');
    const {users} = useSelector(state => state.users)
    const dispatch = useDispatch();

    const handleNewUser = (e) => {
        e.preventDefault();
        dispatch(addUser(username))
        setUsername('');
    }

  return (
    <div className="dropdown">
        {mode === 'add' ? (
            <form className='user__form' onSubmit={handleNewUser}>
                <label htmlFor="">Your name:</label>
                <input 
                    type="text" 
                    placeholder='Full name...'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type='submit'>Submit!</button>
            </form>
        ) : (
            <>
                {users.map(user => (
                    <button 
                        key={user.id}
                        onClick={() => dispatch(chooseUser(user.id))}
                    >{user.name}</button>
                ))} 
            </>
        )}
    </div>
  )
}

export default Dropdown
