import {Line, Scatter} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function parseEntryDateTime(entry) {
    if (!entry || !entry.date) return new Date(0);

    const [year, month, day] = entry.date.split("-").map(Number);
    let [hm, ampm] = entry.time.trim().split(" ");
    let [hour, minute] = hm.split(":").map(Number);

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    return new Date(year, month - 1, day, hour, minute);
}

function Trends({entries}) {
    const sortedEntries = [...entries].sort(
        (a, b) => parseEntryDateTime(a) - parseEntryDateTime(b)
    );

    const dates = sortedEntries.map((entry) => {
        const d = parseEntryDateTime(entry);
        return d.toLocaleDateString("en-US", {month: "short", day: "numeric"});
    });

    const moods = sortedEntries.map((entry) => entry.feeling);
    const productivities = sortedEntries.map((entry) => entry.productivity);

    const moodData = {
        labels: dates,
        datasets: [
            {
                label: "Mood Over Time",
                data: moods,
                borderColor: "#646cff",
                backgroundColor: "rgba(100,108,255,0.2)",
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: "#646cff",
            },
        ],
    };

    const productivityData = {
        labels: dates,
        datasets: [
            {
                label: "Productivity Over Time",
                data: productivities,
                borderColor: "#ff6b6b",
                backgroundColor: "rgba(255,107,107,0.2)",
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: "#ff6b6b",
            },
        ],
    };

    const sortedForCorrelation = [...entries].sort((a, b) => {
        // sort first by feeling ascending, then by productivity ascending
        if (a.feeling !== b.feeling) return a.feeling - b.feeling;
        return a.productivity - b.productivity;
    });

    const correlationData = {
        datasets: [
            {
                label: "Feeling vs Productivity",
                data: sortedForCorrelation.map(e => ({ x: e.feeling, y: e.productivity })),
                backgroundColor: "#ffa500",
                borderColor: "#ffa500",
                showLine: true,       // connects points in this sorted order
                fill: false,
                pointRadius: 4,
                pointBackgroundColor: "#ffa500",
            },
        ],
    };

    return (
        <div className = "trends-box">
            <h1>Trends Dashboard</h1>

            <div className = "feeling-mood-chart-box">
                <div className = "charts-section">
                    <div style = {{width: "450px", height: "250px", margin: "10px 15px 0 20px"}}>
                        <Line
                            data = {moodData}
                            options = {{
                                scales: {
                                    x: {grid: {color: "#555"}, ticks: {color: "white"}},
                                    y: {grid: {color: "#555"}, ticks: {color: "white"}, suggestedMin: 1, suggestedMax: 10},
                                },
                            }}
                        />
                    </div>
                </div>

                <div className = "charts-section">
                    <div style = {{width: "450px", height: "250px", margin: "10px 15px 0 20px"}}>
                        <Line
                            data = {productivityData}
                            options = {{
                                scales: {
                                    x: {grid: {color: "#555"}, ticks: {color: "white"}},
                                    y: {grid: {color: "#555"}, ticks: {color: "white"}, suggestedMin: 1, suggestedMax: 10},
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className = "correlation-focus-chart-box">
                <div className = "charts-section">
                    <div style = {{width: "450px", height: "450px", margin: "10px 15px 0 20px"}}>
                        <Scatter
                            data = {correlationData}
                            options = {{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        type: "linear",
                                        min: 1,
                                        max: 10,
                                        title: {display: true, text: "Feeling"},
                                        ticks: {color: "white"},
                                        grid: {color: "#555"},
                                    },
                                    y: {
                                        min: 1,
                                        max: 10,
                                        title: {display: true, text: "Productivity"},
                                        ticks: {color: "white"},
                                        grid: {color: "#555"},
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trends;