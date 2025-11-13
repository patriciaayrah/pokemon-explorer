import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import StatChart from './StatChart';
import '../style/ComparisonTool.css';

const fetchPokemonDetails = async (name) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};

function ComparisonTool() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');

  const { data: data1, isLoading: loading1 } = useQuery({
    queryKey: ['pokemon', pokemon1],
    queryFn: () => fetchPokemonDetails(pokemon1),
    enabled: !!pokemon1,
  });

  const { data: data2, isLoading: loading2 } = useQuery({
    queryKey: ['pokemon', pokemon2],
    queryFn: () => fetchPokemonDetails(pokemon2),
    enabled: !!pokemon2,
  });

  const handleCompare = () => {
    if (input1 && input2) {
      setPokemon1(input1.toLowerCase());
      setPokemon2(input2.toLowerCase());
    } else {
      alert('Please enter both Pokémon names!');
    }
  };

  return (
    <div className="comparison-tool">
      <h2>Compare Pokémon</h2>
      <div className="inputs">
        <input
          type="text"
          placeholder="Pokémon 1 name"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pokémon 2 name"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        <button onClick={handleCompare}>Compare</button>
      </div>

      {loading1 || loading2 ? (
        <div>Loading comparison...</div>
      ) : (
        data1 &&
        data2 && (
          <div className="comparison">
            {[data1, data2].map((pokemon, index) => (
              <div key={index} className="pokemon-card">
                <h3>{pokemon.name.toUpperCase()}</h3>
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
                <p>
                  <strong>Types:</strong>{' '}
                  {pokemon.types.map((t) => t.type.name).join(', ')}
                </p>
                <p>
                  <strong>Abilities:</strong>{' '}
                  {pokemon.abilities.map((a) => a.ability.name).join(', ')}
                </p>
                <p>
                  <strong>Base Experience:</strong> {pokemon.base_experience}
                </p>
                <p>
                  <strong>Height:</strong> {pokemon.height / 10} m
                </p>
                <p>
                  <strong>Weight:</strong> {pokemon.weight / 10} kg
                </p>
                <StatChart stats={pokemon.stats} />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default ComparisonTool;
