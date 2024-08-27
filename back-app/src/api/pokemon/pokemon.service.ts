import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { Repository } from 'typeorm';
import { PokemonListDto } from './dto/pokemon-list.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) { }

  /**
   * Service to get pokemon list and count.
   * @returns {PokemonListDto} Promise with list and count of pokemons
   */
  async findAll(): Promise<PokemonListDto> {
    const data = await this.pokemonRepository.find();
    return {
      pokemons: data,
      total_pokemons: 2,
    }
  }

}
