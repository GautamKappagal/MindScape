# MindScape: Mood-Productivity Tracking Journal

**MindScape** is a modern, data-driven web application designed to help users understand the direct relationship between their **emotional state** and their **daily productivity**. It moves beyond simple journaling by visualizing trends, calculating meaningful correlations, and generating actionable insights.

This project was built using **React** and **Vite**, demonstrating proficiency in modern frontend architecture and local state management.

---

## Key Features & Highlights

MindScape is designed with scalability in mind, incorporating features from the Core MVP through to advanced analytical goals.

### Core Analytics (MVP)

| Feature | Description | Technical Implementation |
| :--- | :--- | :--- |
| **Daily Logging** | Capture Mood (1-10 slider), Productivity (1-10 slider), and an optional journal reflection. | React State Management, `localStorage` for persistence. |
| **Visual Trends** | Professional data visualization to show mood and productivity changes over time. | Integration with **Chart.js** (or similar library) for Line and Bar charts. |
| **Simple Correlation** | Auto-generate rule-based insights, e.g., *"Your productivity is usually highest when your mood is above 7."* | Basic JavaScript arithmetic/filtering on stored data. |

### Level-Up & Differentiators

These features elevate the project beyond a basic tracker and are excellent for resume demonstration:

* **Mood-Triggered Recommendations:** If the user logs a low mood ($\text{Mood} < 4$), the system displays tailored, positive suggestions like *"Take a 10-minute walk"* or *"Listen to calming music."*
* **Sentiment Analysis Integration (Planned):** Compare the numerical mood slider with the detected sentiment of the journal text. This is used to generate powerful insights like, *"You selected mood 8, but your journal text indicates high stress—are you masking tension?"*
* **Weekly Summary Reports:** Generate a concise review of the week, highlighting the best day, worst day, and suggested improvement habits.

### Advanced Stretch Goal (Future)

* **Predictive Insight Engine:** Implement simple regression or rule-based models to predict patterns, such as *"Your Tuesday mood typically drops after late Sunday nights."* This showcases an understanding of basic machine learning concepts.

---

## Tech Stack & Architecture

This project is built for speed, performance, and modern development standards.

* **Frontend Framework:** **React (v18+)** with Functional Components and Hooks (`useState`, `useEffect`).
* **Bundler / Dev Environment:** **Vite** for lightning-fast hot module reloading and optimized production builds.
* **Styling:** Modular CSS, Flexbox for complex layout management.
* **Data Persistence (MVP):** Browser's **`localStorage`** for local data storage and seamless offline use.
* **Future Backend Path:** Planned migration to **Firebase Firestore** for scalable data management and multi-device sync.

---

## Project Structure

The UI follows a classic dashboard pattern for optimal user experience:

* **Sidebar Navigation:** Used for quick context switching between the main views: `Entries`, `Analysis`, `Trends`, and `Streak`.
* **`Entries` View:** The main input form where users log data and view their historical reflections.
* **`Analysis` View:** The core dashboard that presents computed statistics (Averages, Totals, Correlation Score) and generates textual insights.

---

## Installation and Local Setup

To run MindScape locally, follow these steps:

1.  Clone the repository:

    ```bash
    git clone [your-repo-url]
    cd mindscape
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Open your browser to the URL provided by Vite (usually `http://localhost:5173`).

---
