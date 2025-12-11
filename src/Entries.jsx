
import React, {useState} from 'react'
import Sentiment from 'sentiment'

function Entries({entries, setEntries}) {
    const [entryTitle, setEntryTitle] = useState("")
    const [entryDesc, setEntryDesc] = useState("")
    const [feeling, setFeeling] = useState(10)
    const [productivity, setProductivity] = useState(10)
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [showForm, setShowForm] = useState(false)

    const sentiment = new Sentiment();

    function saveEntry() {
        const timestamp = new Date();
        const combinedText = entryTitle + " " + entryDesc;
        const analysisResult = sentiment.analyze(combinedText);
        const sentimentScore = analysisResult.score;

        const newEntry = {
            date,
            time: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            feeling,
            productivity,
            entryTitle,
            entryDesc,
            sentimentScore
        }

        setEntries([newEntry, ...entries])
        setEntryTitle("")
        setEntryDesc("")
        setShowForm(false)
    }

    function handleDelete(index) {
        const updated = entries.filter((_, i) => i !== index);
        setEntries(updated);
    }

    return (
        <div className = "entries-box">
            <div className = "title-plus">
                <h1>Entries</h1>
                <button className = {`add-entry-toggle ${showForm ? "active-plus" : ""}`} onClick = {() => setShowForm(!showForm)}>
                    +
                </button>
            </div>

            <div className = {`new-entries-box ${showForm ? "show" : ""}`}>
                {showForm && (
                <>
                    <div className="sliders">
                    <div>
                        <h3>How are you feeling?</h3>
                        <input
                        className="feeling-slider"
                        type="range"
                        min="1"
                        max="10"
                        value={feeling}
                        onChange={(event) => setFeeling(event.target.value)}
                        />
                    </div>

                        <div>
                            <h3>Productivity</h3>
                            <input
                                className="productivity-slider"
                                type="range"
                                min="1"
                                max="10"
                                value={productivity}
                                onChange={(event) => setProductivity(event.target.value)}
                            />
                        </div>
                    </div>

                    <h3>Journal Reflection (Optional)</h3>
                    <div className = "entry-text-inputs-box">
                        <textarea
                            className = "add-entry-title-box"
                            placeholder = "Write a title for the entry..."
                            value = {entryTitle}
                            onChange = {(event) => setEntryTitle(event.target.value)}
                        ></textarea>
                        <textarea
                            className = "add-entry-description-box"
                            placeholder = "Write a short reflection..."
                            value = {entryDesc}
                            onChange = {(event) => setEntryDesc(event.target.value)}
                        />
                    </div>

                    <button className="save-entry-button" onClick={saveEntry}>
                        Save Entry
                    </button>
                </>
                )}
            </div>

            <div className = "past-entries-box" style = {{marginTop: "40px"}}>
                {entries.map((entry, index) => (
                    <div className = "past-entry" key = {index} style = {{
                        background: "#2e2e2eff",
                        padding: "10px 25px 25px 25px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        width: "725px"
                    }}>
                        <button className = "delete-entry" onClick = {() => handleDelete(index)}>
                            🗑
                        </button>

                        <div className = "entry-date-time">
                            <h3 className = "entry-date">Date: {entry.date}</h3>
                            <h3 className = "entry-time">Time: {entry.time}</h3>
                        </div>

                        <div className = "entry-slider-stats">
                            <h3>Feeling: {entry.feeling}/10</h3>
                            <h3>Productivity: {entry.productivity}/10</h3>
                        </div>

                        <h2>{entry.entryTitle}</h2>
                        <p>{entry.entryDesc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Entries