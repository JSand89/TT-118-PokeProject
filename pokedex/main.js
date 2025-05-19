const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const pokemonInfo = document.getElementById("pokemonInfo")
const btnBack = document.getElementById("btnBack")
const pokemonInput= document.getElementById("pokemonInput")
const searchPokemon = document.getElementById("searchPokemon")
let pokemonToSearch = ""

async function getPokemonData(idPokemon) {
    try {
        //const res = await fetch (`http://127.0.0.1:3005/api/pokemon/${idPokemon}`)
        const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        const pokemon = await res.json()
        return pokemon        
    } catch (error) {
        console.error(error)
        return false
    }

}
function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML =`
    <img src = "${pokemon.sprites.front_default}" alt ="imagen del ${pokemon.name}">
    <h3> ${pokemon.name}</h3>
    <p>ID: ${pokemon.id}</p>
</div>

    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
    return true
}
function showPokemonDetail(pokemon){
    let typesName = []
    let typesImg = ""
    for(i=0;i<pokemon.types.length;i++){
        console.log(pokemon.types[i].type.name)
        typesImg = typesImg + `<img src="./assets/${pokemon.types[i].type.name}.png" alt="logo tipo ${pokemon.types[i].type.name}">`
        typesName.push(pokemon.types[i].type.name)
    }
    
    pokemonList.style.display = "none"
    pokemonDetail.style.display ="block"
    pokemonInfo.innerHTML =`
    <img src="${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <h3>${typesName}</h3>
    <div>${typesImg}</div>
     <div class="pokemon-register">
    <h2>Registrar estado de un Pokémon</h2>
    
    `
}
async function loadPokedex() {
    for( let i=1; i<=30;i++){
        let pokemon = await getPokemonData(i)
        displayPokemon(pokemon)
    }
}
btnBack.addEventListener("click",()=>{
    pokemonList.style.display = "grid"
    pokemonDetail.style.display ="none"
})

pokemonInput.addEventListener("input",(e)=>{
    pokemonToSearch = e.target.value
    console.log(pokemonToSearch)
})
searchPokemon.addEventListener("click",async ()=>{
    let pokemon = await getPokemonData(pokemonToSearch)
    if(pokemon==false){
        console.error("Pokemon not found")
        return alert("pokemon not found")
    }
    showPokemonDetail(pokemon) 
})

loadPokedex()

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const pokemon_id = parseInt(document.getElementById('pokemon_id').value);
    const view = document.getElementById('view').checked;
    const capture = document.getElementById('catch').checked;
    const in_team = document.getElementById('in_team').checked;
    const power_level = parseInt(document.getElementById('power_level').value);

    const bodyData = {
        pokemon_id,
        view,
        catch: capture,
        in_team,
        power_level
    };

    console.log("Enviando:", bodyData);

    try {
        const res = await fetch('http://127.0.0.1:3006/api/pokemon/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });

        const result = await res.json();
        console.log("Respuesta del servidor:", result);
        alert('Estado del Pokémon registrado con éxito.');
    } catch (error) {
        console.error("Error al registrar el estado:", error);
        alert('Error al registrar el Pokémon.');
    }
});
