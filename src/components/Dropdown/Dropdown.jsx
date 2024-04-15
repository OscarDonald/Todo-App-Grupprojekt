import './Dropdown.css'
import {useDispatch, useSelector} from 'react-redux';
import { addUser } from '../../feature/userSlice/userSlice';

const Dropdown = ({mode}) => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state);

  return (
    <div className="dropdown">
        {mode === 'add' ? (
            <form className='user__form'>
                <label htmlFor="">Your name:</label>
                <input type="text" placeholder='Full name...' />
            </form>
        ) : (
            <p>Här kommer alla profilerna vara (hehehe yeeeaaahhh)</p> 
        )}
    </div>
  )
}

export default Dropdown
