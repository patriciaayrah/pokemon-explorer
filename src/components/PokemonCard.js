import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../style/PokemonCard.css';


const fetchPokemonDetails = async (name) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};

function PokemonCard({ pokemon }) {
  const { data, isLoading } = useQuery({
    queryKey: ['pokemon', pokemon.name],
    queryFn: () => fetchPokemonDetails(pokemon.name),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div className="pokemon-card">Loading...</div>;

  return (
    <div className="pokemon-card">
      <img src={data.sprites.front_default} alt={data.name} />
      <h3>{data.name}</h3>
      <div className="types">
        {data.types.map(type => (
          <span key={type.type.name} className={`type ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;