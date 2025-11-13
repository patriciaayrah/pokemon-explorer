import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import ComparisonTool from './components/ComparisonTool';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Pokemon App</h1>
            <nav>
              <Link to="/">List</Link> | <Link to="/compare">Compare</Link>
            </nav>
          </header>
          <div className="page-container">
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
              <Route path="/compare" element={<ComparisonTool />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
