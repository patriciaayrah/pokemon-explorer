import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StatChart from './StatChart';
import '../style/PokemonDetail.css';

const fetchPokemonDetails = async (name) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};

const fetchPokemonSpecies = async (id) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  return response.data;
};

function PokemonDetail() {
  const { id } = useParams();

  const { data: pokemon, isLoading: pokemonLoading, isError: pokemonError } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonDetails(id),
  });

  const { data: species, isLoading: speciesLoading, isError: speciesError } = useQuery({
    queryKey: ['species', pokemon?.id],
    queryFn: () => fetchPokemonSpecies(pokemon.id),
    enabled: !!pokemon,
  });

  if (pokemonLoading || speciesLoading) return <div>Loading...</div>;
  if (pokemonError || speciesError) return <div>Error loading Pokemon details</div>;

  const evolutionChain = species?.evolution_chain?.url ? 'Evolution chain available' : 'No evolution data';

  return (
    <div className="pokemon-detail">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="types">
        {pokemon.types.map(type => (
          <span key={type.type.name} className={`type ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
      <StatChart stats={pokemon.stats} />
      <div className="abilities">
        <h3>Abilities</h3>
        <ul>
          {pokemon.abilities.map(ability => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="moves">
        <h3>Moves (first 10)</h3>
        <ul>
          {pokemon.moves.slice(0, 10).map(move => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </ul>
      </div>
      <div className="evolution">
        <h3>Evolution Chain</h3>
        <p>{evolutionChain}</p>
      </div>
    </div>
  );
}

export default PokemonDetail;