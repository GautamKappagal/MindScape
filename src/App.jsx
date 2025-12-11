import { useState, useEffect } from 'react'
import './App.css'
import Entries from './Entries'
import Analysis from './Analysis'
import Trends from './Trends'

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
        <button className={page === "entries" ? "active-page" : ""} onClick = {() => setPage("entries")}>Entries</button>
        <button className={page === "analysis" ? "active-page" : ""} onClick = {() => setPage("analysis")}>Analysis</button>
        <button className={page === "trends" ? "active-page" : ""} onClick = {() => setPage("trends")}>Trends</button>
        <button className={page === "streak" ? "active-page" : ""} onClick = {() => setPage("streak")}>Streak</button>
      </div>

      {/* Right Content */}
      <div className={`content ${page === "trends" ? "trends-page" : ""}`}>
        {page === "entries" && <Entries entries={entries} setEntries={setEntries} />}
        {page === "trends" && <Trends entries={entries} />}
        {page === "analysis" && <Analysis entries={entries} />}
        {page === "streak" && <h2>Streak page coming soon</h2>}
      </div>
    </div>
  )
}

export default App