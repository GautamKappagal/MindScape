import React, {useState, useEffect} from 'react';
import Sentiment from 'sentiment';

function Analysis({entries}) {
    const [suggestion, setSuggestion] = useState("");
    const [sentimentScore, setSentimentScore] = useState(0);

    const sentimentAnalyzer = new Sentiment();

    const totalEntries = entries.length;
    const averageMood = totalEntries ? (entries.reduce((sum, entry) => sum + Number(entry.feeling), 0) / totalEntries).toFixed(1) : 0;

    const averageProductivity = totalEntries ? (entries.reduce((sum, entry) => sum + Number(entry.productivity), 0) / totalEntries).toFixed(1) : 0;

    // Generate suggestion based on all three together
    const generateSuggestion = (sentimentScore, feelingValue, productivityValue) => {
        if (sentimentScore < 0 && feelingValue <= 3 && productivityValue <= 4) return "You seem stressed and drained. Take a break or do something relaxing.";

        else if (sentimentScore >= 0 && feelingValue >= 7 && productivityValue <= 4) return "You're feeling good but productivity is low — focus on small achievable tasks.";

        else if (sentimentScore < 0 && feelingValue <= 4 && productivityValue >= 7) return "You're pushing hard even with low mood — consider a short rest or mindfulness exercise.";

        else if (sentimentScore > 0.5 && feelingValue >= 7 && productivityValue >= 7) return "Excellent mood and high productivity! Keep up the great work!";

        else return "Maintain your balance and consistency for a steady progress.";
    };

    useEffect(() => {
        if (totalEntries === 0) {
            setSuggestion("Add an entry to get today's suggestion!");
            setSentimentScore(0);
            return;
        }

        const latestEntry = entries[0];
        const combinedText = latestEntry.entryTitle + " " + latestEntry.entryDesc;
        const score = sentimentAnalyzer.analyze(combinedText).score;
        setSentimentScore(score);

        const newSuggestion = generateSuggestion(
        score,
        latestEntry.feeling,
        latestEntry.productivity
        );
        setSuggestion(newSuggestion);
    }, [entries, totalEntries]);

    return (
        <div className = "master-content-box">
            <h1>Analysis Dashboard</h1>
            <div className = "stats-summary">
                <div className = "num-entries-card">
                    <div className = "stat-title">
                        <h3>Total Entries</h3>
                    </div>

                    <div className = "stat-value">
                        <h2>{totalEntries}</h2>
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

                <div className = "stat-value">
                    <p>{suggestion}</p>
                </div>
            </div>
        </div>
    )
}

export default Analysis