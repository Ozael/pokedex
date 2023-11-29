const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("load-more-button");
const maxRecords = 12;
const limit = 5;
let offset = 0;

const loadPokemonItems = (offset, limit) => {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons
      .map(
        (pokemon) =>
          `<li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
        ${pokemon.types
          .map((type) => `<li class='type ${type}'>${type}</li>`)
          .join("")}
      </ol>
      <img
        src="${pokemon.photo}"
        alt="${pokemon.name}"
      />
    </div>
  </li>`
      )
      .join("");
  });
};

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});
