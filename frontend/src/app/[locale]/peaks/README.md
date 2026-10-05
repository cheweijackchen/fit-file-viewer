# Peaks — Taiwan 100 Peaks Tracker

A browser-based tracker for Taiwan's 100 famous mountain peaks (台灣百岳). Log your climbing progress, visualize it on a map, and share your achievements.

## Features

### Peak Checklist

- 100 peaks organized into 18 mountain group categories
- Search peaks by name
- Select all / deselect all within each category
- Expandable category sections with completion counts

### Interactive Map

- Vector map (MapLibre GL) centered on Taiwan
- Individual peak markers showing name and elevation
- Category cluster markers at lower zoom levels

### Progress Tracking

- Ring progress chart displaying overall completion
- Progress bar with percentage and count
- All data automatically saved to localStorage

### Image Export & Sharing

Generate a shareable progress card with customizable options:

- **Your name** — displayed on the card
- **Title style** — choose from Classic, RPG, or Meme themes, with dynamic titles based on completion milestones
- **Hiking companion** — 30+ selectable characters including Taiwan wildlife, mythical creatures, and hikers
- **Image width** — mobile (375px) or desktop (768px) optimized
- **Date stamp** — optional date overlay

Export options:

- **Download** — save as PNG
- **Share** — share directly via Web Share API (on supported devices)

### Responsive Layout

- **Desktop** — side panel checklist + full map
- **Mobile** — full-screen map with bottom sheet drawer for controls
