const pokemonsList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0;



function orderNumer(pokemon){
  let numero = pokemon.number
  if(numero < 10){
    numeroFormatado = `00${numero}`
  }else if(numero >= 10 && numero < 100){
    numeroFormatado = `0${numero}`
  }else{
    numeroFormatado = `${numero}`
  }
  return numeroFormatado
}

function loadPokemonItens(limit,offset){
  
  pokeApi.getPokemons(offset,limit).then((pokemons = [])  => {
      const newHtml = pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
            <span class="number">#${orderNumer(pokemon)}</span>
            <span class="name">${pokemon.name}</span>
  
            <div class="detail">
              <ol class="types">
                ${pokemon.types.map((type) => `<li class ="type ${type}">${type}</li>`).join(' ')}
              </ol>
              <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
          </li>
          `).join(' ')
      pokemonsList.innerHTML += newHtml
  })

}

loadPokemonItens(limit,offset)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordNextPage = offset + limit

  if (qtdRecordNextPage >= maxRecords){
    const newLimit =  maxRecords - offset;
    loadPokemonItens(newLimit,offset)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItens(limit,offset)
  }

})
