# Pokémon Explorer React App

## Project Description
This is a React-based Pokémon application that allows users to explore Pokémon data from the [PokéAPI](https://pokeapi.co/). Users can view a list of Pokémon with pagination or infinite scroll, search and filter Pokémon, view detailed information, and explore creative features such as Pokémon comparison, team building, and battle simulations.

---

## Setup / Installation Instructions
1. **Clone the repository:**

git clone https://github.com/patriciaayrah/pokemon-explorer.git
cd <your-project-folder>

2. Install dependencies:
npm install

3. Run the application:
npm start

4. Open in your browser:
http://localhost:3000

-- 
## How to Run the Application

After installation:
npm start

## Demo Link
https://pokemon-explorer-test.netlify.app/

## Challenges Faced and Solutions

Challenge: Nested API data for evolution.

Solution: Recursive function to parse and display the chain.

Comparing Pokémon stats

Challenge: Display multiple stats clearly.

Solution: Used bar charts

## Key Functionality
1. Pokemon List View

2. Displays Pokémon with images, names, and types.

3. Search/filter by name or type.

4. Pagination for performance.

5. Pokemon Detail View

6. Pokemon Comparison Tool: Compare Pokémon side by side.

7. Custom Pokémon Cards: Dynamic profiles with stats and images.

## API Integration

Base API: https://pokeapi.co/api/v2

Endpoints:

/pokemon → List of Pokémon

/pokemon/{id or name} → Pokémon details

/pokemon-species/{id or name} → Evolution chain

Handled with fetch or axios and cached via react-query.

## Technologies Used

1. React.js
2. React Query
3. CSS / Tailwind
4. Recharts (visualizations)
5. PokéAPI for data