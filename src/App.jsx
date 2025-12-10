import { useState, useEffect } from 'react'
import './App.css'
import Entries from './Entries'
import Analysis from './Analysis'


function App() {
  const [page, setPage] = useState("entries")
  const [entries, setEntries] = useState(
    JSON.parse(localStorage.getItem("entries")) || []
  );

  useEffect(() => {
    if (entries.length === 0) localStorage.removeItem("entries");
    else localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  return (
    <div style = {{display: "flex"}}>
      {/* Left Sidebar */}
      <div className = "sidebar">
        <h2 className = "sidebar-title">MindScape</h2>
        <button onClick = {() => setPage("entries")}>Entries</button>
        <button onClick = {() => setPage("analysis")}>Analysis</button>
        <button onClick = {() => setPage("trends")}>Trends</button>
        <button onClick = {() => setPage("streak")}>Streak</button>

      </div>

      {/* Right Content */}
      <div className = "content">
        {page === "entries" && <Entries entries = {entries} setEntries = {setEntries} />}
        {page === "analysis" && <Analysis entries = {entries} />}
        {page === "trends" && <h2>Trends page coming soon</h2>}
        {page === "streak" && <h2>Streak page coming soon</h2>}
      </div>
    </div>
  )
}

export default App