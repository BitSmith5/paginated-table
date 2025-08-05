import { useState } from 'react'
import { DataTable } from './components/DataTable'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <DataTable
        data={[
          { id: '1', name: 'Alice', age: 30, active: true },
          { id: '2', name: 'Bob', age: 25, active: false },
          { id: '3', name: 'Charlie', age: 35, active: true },
          { id: '4', name: 'David', age: 28, active: false },
          { id: '5', name: 'Eve', age: 22, active: true },
          { id: '6', name: 'Frank', age: 40, active: false },
          { id: '7', name: 'Grace', age: 29, active: true },
          { id: '8', name: 'Heidi', age: 31, active: false },
          { id: '9', name: 'Ivan', age: 27, active: true },
          { id: '10', name: 'Judy', age: 33, active: false }
        ]}
        itemsPerPage={5}
        showPagination={true}
        onRowClick={(row) => alert(`Row clicked with ID ${row.id}`)}
      />
    </div>
  )
}

export default App
