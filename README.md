# React Flow Diagram with Dishes and Categories

This project is a dynamic food category and dish explorer built using the **React Flow** library. It fetches categories and dishes from the [TheMealDB API](https://www.themealdb.com/) and displays them in an interactive flow diagram. Clicking on a category node will fetch and display the dishes, and clicking on a dish node will show details about that specific dish.

## Features

- **Interactive Flow Diagram**: Users can explore food categories and dishes through an intuitive node-based flow.
- **Dynamic Category Loading**: Categories are fetched and added dynamically to the flow when clicked.
- **Dish Details**: Clicking on a dish shows more detailed information such as its image and instructions.
- **Node and Edge Changes**: Supports node dragging, dynamic edge connections, and other flow-based interactions using `applyNodeChanges` and `applyEdgeChanges`.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **ReactFlow**: Library for creating interactive node-based flow diagrams.
- **Axios**: Promise-based HTTP client for making requests to the MealDB API.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TheMealDB API**: API for fetching meal categories and dishes.

## Prerequisites

Before you can run this project, you need to have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (or yarn)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/food-flow-diagram.git
cd food-flow-diagram
```

### 2. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Run the Application

To start the development server, use the following command:

```bash
npm run dev
```

This will run the app in development mode, and you can access it by opening [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

To build the app for production, use:

```bash
npm run build
```

## How to Use

1. **Explorer Node**: The initial node in the diagram is the **Explorer**. Click it to fetch and display food categories from TheMealDB API.
2. **Category Nodes**: Clicking on any category node will fetch the dishes from that category and display them as new nodes.
3. **Dish Nodes**: Clicking on a dish node will show the details of the dish (e.g., image, instructions) on the right side of the screen.

## Project Structure

The key files for this project are:

- **src/components/Flow.js**: The main component that contains the React Flow diagram, logic for fetching categories, dishes, and handling node clicks.
- **src/App.js**: Root component that renders the Flow component.

## API Reference

This project uses [TheMealDB API](https://www.themealdb.com/) to fetch meal categories and dishes. The following endpoints are used:

- **Categories**: `https://www.themealdb.com/api/json/v1/1/categories.php`
- **Dishes by Category**: `https://www.themealdb.com/api/json/v1/1/filter.php?c={category}`
- **Dish Details**: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={dishId}`

## Live Demo

-Link :- https://fooditemnodes.netlify.app/
