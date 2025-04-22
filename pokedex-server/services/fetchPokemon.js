const fetchPokemon = async(pokemon_id,pokemonStatus)=>{
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`)
        // console.log(response.status)
        if(response.status == 404){
            return 404
        }
        const pokemon = await response.json()
        let pokemonData ={
            id:pokemon_id,
            view:pokemonStatus.view,
            catch:pokemonStatus.catch,
            in_team:pokemonStatus.in_team,
            name:pokemon.name,
            sprites:{front_default:pokemon.sprites.front_default,
                back_default:pokemon.sprites.back_default
            },
            types:pokemon.types
        }
        return pokemonData;
    } catch (error) {
        return error
    }
}
export default fetchPokemon