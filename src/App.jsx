import './App.css';
import Columns from './components/Columns/Columns.jsx';
import ListView from './components/ListView/ListView.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Columns />,
    children: [
      {
        path: '/:id',
        element: null
      }
    ]
  },
  {
    path: '/listview',
    element: <ListView />,

  }
]);


function App() {

  return (
    <main>
      <RouterProvider router={router}/>
      
    </main>
  )
}

export default App;