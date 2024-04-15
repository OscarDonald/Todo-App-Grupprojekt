import './App.css'
import Header from './components/Header/Header'
import CreateTask from './components/createTask/CreateTask'
import Columns from './components/Columns/Columns.jsx'

function App() {


  return (
    <main>
      <Header />
      <CreateTask />
      <Columns />
      <Columns />
      <Columns />
    </main>



  )
}

export default App;