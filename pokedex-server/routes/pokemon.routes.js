import express from "express";

import pokemonControllers from "../controllers/pokemon.controllers.js"
import pokemonStatus from "../controllers/pokemonStatus.controller.js";
const router = express.Router();

router.get("/hello",pokemonControllers.hiTrainer);
router.post("/",pokemonControllers.createPokemon);
router.get("/",pokemonControllers.getPokemons);
router.get("/:pokemon_id", pokemonControllers.getPokemonByIdPokemon);
router.put("/catch/:pokemon_id",pokemonStatus.catchPokemonByIdPokemon);
router.post("/view",pokemonStatus.changeStatusToViewByIdPokemon);



export default router