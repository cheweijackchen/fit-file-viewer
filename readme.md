# [FIT File Viewer](https://fit-file-viewer.vercel.app/)
A web-based tool designed to parse, analyze, and visualize `.fit` (Flexible and Interoperable Data Transfer) activity files from fitness devices like Garmin, Sunnto, and Coros.

<img width="797" height="561" alt="截圖 2026-02-14 21 43 47" src="https://github.com/user-attachments/assets/dd6ae666-f1b4-43d9-a00d-e3b418897c09" />

## What is a .FIT file?
The .FIT format is a binary file protocol developed by ANT+. It is the industry standard for recording GPS tracks, sensor data (heart rate, power, cadence), and event information during fitness activities. Unlike GPX (which is XML-based), FIT files are compact, highly extensible, and support complex data fields like HRV, training load, and device-specific metrics.

## Key Features
### Fit File Handling
- Instant Parsing: Drag-and-drop .fit files for client-side parsing—no data is ever uploaded to a server, ensuring 100% privacy.

### Data Visualization
- Activity Dashboard: View high-level metrics at a glance, including total distance, elapsed time, average speed, and total calories burned.
- Heart Rate Analysis: Breakdown of time spent in different Heart Rate Zones to help analyze training intensity.
- Elevation Profile: Interactive line charts showing altitude changes throughout the activity.
- Records Table: A searchable table displaying every recorded data point (timestamp, position, speed, cadence, etc.).

### Interactive Mapping
- Route Trace: High-fidelity rendering of the activity path on an interactive map.
- Distance Markers: Automatic distance markers (e.g., every 1km or 5km) to help users visualize their pace and progress over specific segments.
    
