import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import '../style/PokemonList.css';


const fetchPokemonList = async (page) => {
  const offset = (page - 1) * 20;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
  return response.data;
};

function PokemonList() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pokemonList', page],
    queryFn: () => fetchPokemonList(page),
    keepPreviousData: true,
  });

  const filteredPokemon = data?.results.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="pokemon-list">
        {filteredPokemon.map(pokemon => (
          <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={Math.ceil(1118 / 20)} />
    </div>
  );
}

export default PokemonList;