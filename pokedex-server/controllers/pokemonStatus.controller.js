import pokemonModel from "../models/pokemon.model.js"
import PokemonModel from "../models/pokemon.model.js"
import fetchPokemon from "../services/fetchPokemon.js"

const changeStatusToViewByIdPokemon = async (req,res)=>{
    try {
        console.log(req.body.pokemon_id)
        const statusInPokeapi = await fetchPokemon(req.body.pokemon_id)
        console.log(statusInPokeapi)
        if(statusInPokeapi == 404){
            return res.status(404).json({
                message:"Pokemon not exists",
                status:404,
                data:null
            })
        }
        const pokemon = new pokemonModel(req.body)
        await pokemon.save()
        return res.status(201).json(pokemon)
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            status:error.status,
            data:error
        })
    }
}

const catchPokemonByIdPokemon = async (req,res)=>{
    try {
        const pokemon_id = req.params.pokemon_id
        const pokemonNew ={
            pokemon_id:pokemon_id,
            view:true,
            catch:true,
            in_team:false
        }
        let filter = {pokemon_id:pokemon_id}
        const pokemon = await PokemonModel.findOneAndReplace(filter,pokemonNew,{new:true})
        if(!pokemon){
            return res.status(404).json({
                message:"Pokemon not seen yet",
                status:404,
                data:null
            })
        }
        return  res.status(200).json({
            message:"Ok",
            status:200,
            data:pokemon
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:error.message,
            status:error.status,
            data:error
        })
    }
}

const addPokemonInTeamById = async (req,res)=>{
    try {
        const pokemon_id = req.params.pokemon_id
        const status = req.body.in_team //o true o false 
        let pokemon = await pokemonModel.findOne({"pokemon_id":pokemon_id})
        if(!pokemon){
            //no encuento en la base de datos
        }
        else if( pokemon.view == true && pokemon.catch == true){
            //Esta en la base de datos y esta con los estados correctos
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            status:error.status,
            data:error
        })
    }

}
export default {catchPokemonByIdPokemon, changeStatusToViewByIdPokemon}