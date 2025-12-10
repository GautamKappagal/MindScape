function Analysis({entries}) {
    const numEntries = entries.length;
    const averageMood = entries.length
      ? (entries.reduce((sum, e) => sum + +e.feeling, 0) / entries.length).toFixed(1)
      : 0;
    const averageProductivity = entries.length
      ? (entries.reduce((sum, e) => sum + +e.productivity, 0) / entries.length).toFixed(1)
      : 0;
    const latest = entries[0];  // since entries are sorted newest first

    let suggestion = "";

    if (!latest) suggestion = "Add an entry to get today's suggestion!";
    else if (latest.feeling <= 3 && latest.productivity <= 4) suggestion = "You're drained today. Take a break, go easy on yourself.";
    else if (latest.feeling >= 7 && latest.productivity <= 4)
    suggestion = "Energy is good but productivity is low — maybe reward yourself or try something fun.";
    else if (latest.feeling <= 4 && latest.productivity >= 7) suggestion = "You're pushing hard even on a low mood. Try a decompress activity.";
    else suggestion = "You're doing well today. Keep it going!";

    return (
        <div className = "master-content-box">
            <h1>Analysis Dashboard</h1>
            <div className = "stats-summary">
                <div className = "num-entries-card">
                    <div className = "stat-title">
                        <h3>Total Entries</h3>
                    </div>

                    <div className = "stat-value">
                        <h2>{numEntries}</h2>
                    </div>
                </div>

                <div className = "avg-mood-card">
                    <div className = "stat-title">
                        <h3>Average Mood</h3>
                    </div>

                    <div className = "stat-value">
                        <h2>{averageMood}/10</h2>
                    </div>
                </div>

                <div className = "avg-productivity-card">
                    <div className = "stat-title">
                        <h3>Average Productivity</h3>
                    </div>

                    <div className = "stat-value">
                        <h2>{averageProductivity}/10</h2>
                    </div>
                </div>
            </div>

            <div className = "suggested-action-today">
                <div className = "stat-title">
                    <h2>Suggested Action for Today</h2>
                </div>

                <div className="stat-value">
                    <p>{suggestion}</p>
                </div>
            </div>
        </div>
    )
}

export default Analysis