const pokeApi = {};

const convertPokeApiDetailToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = (pokemon.types = pokeDetail.types.map(
    (typeSlot) => typeSlot.type.name
  ));
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  pokeApi.getPokemonDetail = (pokemon) =>
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((pokemon) => convertPokeApiDetailToPokemon(pokemon));

  return fetch(url)
    .then((response) => response.json())
    .then((json) => json.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetail) => pokemonDetail)
    .catch((error) => console.log(error));
};
