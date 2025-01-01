# Sorting Algorithm Visualizer

An interactive web application that helps users understand sorting algorithms through visual animations and educational explanations.

## Features

- Real-time visualization of sorting processes
- Educational mode with step-by-step explanations
- Audio feedback for sorting operations
- Interactive controls for:
  - Algorithm selection
  - Visualization speed
  - Array size customization
- Detailed explanations of each sorting step
- Responsive design for both desktop and mobile

## Supported Algorithms

- **Bubble Sort**: Compares adjacent elements and swaps them if they're in the wrong order
- **Quick Sort**: Uses divide-and-conquer with a pivot element
- **Merge Sort**: Divides the array into smaller subarrays, sorts, and merges them
- **Insertion Sort**: Builds the sorted array one item at a time
- **Selection Sort**: Repeatedly finds the minimum element from the unsorted portion

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Express
- **Database**: PostgreSQL (using DrizzleORM)
- **Real-Time Updates**: WebSocket
- **Additional Features**: Sound effects for enhanced feedback

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or later)
- PostgreSQL

### Installation

 Clone the repository:
   ```bash
   git clone https://github.com/NickitaKhylkouski/Sorting-Algorithms-Visualized.git
   cd sorting-algorithm-visualizer
```

### Install Dependencies

 Install dependencies:
   ```bash
   npm install
```

## Getting Started

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://0.0.0.0:5000`.

## Available Scripts

- **npm run dev**: Start the development server
- **npm run build**: Build the application for production
- **npm run start**: Start the production server
- **npm run check**: Perform TypeScript type checking
- **npm run db:push**: Push database schema changes

## Project Structure

### Frontend (/client)

The React frontend application contains several core components:

#### Core Components
- **ControlPanel.tsx**: Controls for algorithm selection, speed, array size, and educational mode
- **VisualizationArea.tsx**: Renders the array visualization with bars
- **ExplanationPanel.tsx**: Displays algorithm steps and explanations
- **Navigation.tsx**: Main navigation menu

#### Visualization Engine
- **AnimationEngine.ts**: Manages animation states, timing, and audio feedback for sorting operations

### Backend

- **/server**: Express backend server
- **/db**: Database schema and configuration

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
