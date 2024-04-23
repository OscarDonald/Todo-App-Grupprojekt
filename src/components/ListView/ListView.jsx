import React, { useEffect, useState } from 'react'
import styles from './ListView.module.css'
import { Link } from 'react-router-dom'
import "../../index.css"

const ListView = () => {


    return (
        <>
        <Link to={"/"}><li>Gå tillbaka</li></Link>

        <div className=''>
            ListView
        </div>
        </>
    )
}

export default ListView