import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import './App.css';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPokemons = async () => {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
            const pokemonData = await Promise.all(
                response.data.results.map(async (pokemon) => {
                    const pokemonResponse = await axios.get(pokemon.url);
                    return pokemonResponse.data;
                })
            );
            setPokemons(pokemonData);
        };
        fetchPokemons();
    }, []);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <h1>Pokémon List</h1>
            <input
                type="text"
                placeholder="Search Pokémon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <PokemonList pokemons={filteredPokemons} />
        </div>
    );
};

export default App;