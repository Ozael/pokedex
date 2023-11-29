const container = document.getElementById("container");

fetch(
  `https://pokeapi.co/api/v2/pokemon/${sessionStorage.getItem("pokemonNumber")}`
)
  .then((response) => response.json())
  .then((details) => {
    const types = details.types.map((index) => index.type.name);
    const photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${details.id}.svg`;

    const abilities = details.abilities.map((index) => index.ability.name);

    const pokemonContainer = `
    <div class="detail">
    <div class="title">
    <h1 class="name">${details.name}</h1>
    <span class="number">#${details.id}</span>
    </div>
    <ol class="types">${types
      .map((type) => {
        return `<li class="type ${type}">${type}</li>`;
      })
      .join("")}
      </ol>
      </div>
      <img
      src=${photo}
      alt="${details.name}"
      />
      `;

    const stats = `
      <table>
      <tr>
      <th>Species</th>
      <th>Height</th>
      <th>Weight</th>
      <th>Abilities</th>
            </tr>
            <tr>
            <td>${details.species.name}</td>
            <td>${details.height}</td>
            <td>${details.weight}</td>
            ${abilities.map((ability) => `<td>${ability}</td>`).join("")}
            </tr>
            </table>`;

    container.classList.add(types[0]);
    container.innerHTML = pokemonContainer + stats;
  });
