import { useState } from 'react'
import './App.css'
import Entries from './Entries'

function App() {
  const [page, setPage] = useState("entries")

  return (
    <div style = {{display: "flex"}}>
      {/* Left Sidebar */}
      <div className = "sidebar">
        <h2 className = "sidebar-title">MindScape</h2>
        <button
          onClick={() => setPage("entries")}>
          Entries</button>
        <button
          onClick={() => setPage("trends")}>
          Trends</button>
        <button
          onClick={() => setPage("analysis")}>
          Analysis</button>
        <button
          onClick={() => setPage("streak")}>
          Streak</button>
      </div>

      {/* Right Content */}
      <div className = "content">
        {page == "entries" && <Entries/>}
      </div>
    </div>
  )
}

export default App