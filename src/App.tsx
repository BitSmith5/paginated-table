import { DataTable } from './components/DataTable'
import './App.css'
import { Data } from './data'

function App() {
  return (
    <div className="App">
      <h1>Paginated Data Table</h1>
      <DataTable
        data={Data}
        itemsPerPage={7}
        showPagination={true}
        onRowClick={(row) => alert(`Row clicked with ID ${row.id}`)}
      />
    </div>
  )
}

export default App
