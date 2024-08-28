import { Injectable, NotFoundException } from '@nestjs/common';
import { BattleDto } from './dto/battle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Repository } from 'typeorm';
import { Battle } from './entities/battle.entity';
import { Turn } from './entities/turn.entity';
import { TurnPokemon } from './entities/turnPokemon.entity';
import { calculateDamage } from './helpers';
import { BattleListDto } from './dto/battle-list.dto.';

@Injectable()
export class BattleService {

  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
    @InjectRepository(Turn)
    private readonly turnRepository: Repository<Turn>,
    @InjectRepository(TurnPokemon)
    private readonly turnPokemonRepository: Repository<TurnPokemon>
  ) { }

  async battle(battleDto: BattleDto) {
    const pokemon1Promise = this.pokemonRepository.findOne({ where: { id: battleDto.id_pokemon1 } });
    const pokemon2Promise = this.pokemonRepository.findOne({ where: { id: battleDto.id_pokemon2 } });
    const [pokemon1, pokemon2] = await Promise.all([pokemon1Promise, pokemon2Promise]);
    if (!pokemon1 || !pokemon2) {
      throw new NotFoundException('Can not found pokemon!');
    }
    const battleObj = new Battle();
    battleObj.turns = [];
    let turnNumber = 1;
    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      const turnPokemon = new TurnPokemon()
      const turn = new Turn();
      if (!battleObj.turns.length) {
        if (pokemon1.speed > pokemon2.speed) {
          const damageDoned = calculateDamage(pokemon1, pokemon2);
          turnPokemon.pokemon = pokemon1;
          turnPokemon.damage_done = damageDoned;
          turnPokemon.turn_hp = pokemon1.hp;
        } else if (pokemon1.speed < pokemon2.speed) {
          const damageDoned = calculateDamage(pokemon2, pokemon1);
          turnPokemon.pokemon = pokemon2;
          turnPokemon.damage_done = damageDoned;
          turnPokemon.turn_hp = pokemon2.hp;
        } else if (pokemon1.speed === pokemon2.speed) {
          if (pokemon1.attack > pokemon2.attack) {
            const damageDoned = calculateDamage(pokemon1, pokemon2);
            turnPokemon.pokemon = pokemon1;
            turnPokemon.damage_done = damageDoned;
            turnPokemon.turn_hp = pokemon1.hp;
          } else if (pokemon1.attack < pokemon2.attack) {
            const damageDoned = calculateDamage(pokemon2, pokemon1);
            turnPokemon.pokemon = pokemon2;
            turnPokemon.damage_done = damageDoned;
            turnPokemon.turn_hp = pokemon2.hp;
          }
        }
      } else {
        if (battleObj.turns[battleObj.turns.length - 1].turnPokemon.pokemon.id === pokemon1.id) {
          if (pokemon2.hp > 0) {
            const damageDoned = calculateDamage(pokemon2, pokemon1);
            turnPokemon.damage_done = damageDoned;
            turnPokemon.turn_hp = pokemon2.hp;
          } else {
            turnPokemon.damage_done = 0;
            turnPokemon.turn_hp = 0;
          }
          turnPokemon.pokemon = pokemon2;
        } else {
          if (pokemon1.hp > 0) {
            const damageDoned = calculateDamage(pokemon1, pokemon2);
            turnPokemon.damage_done = damageDoned;
            turnPokemon.turn_hp = pokemon1.hp;
          } else {
            turnPokemon.damage_done = 0;
            turnPokemon.turn_hp = 0;
          }
          turnPokemon.pokemon = pokemon1;
        }
      }
      turn.turn_number = turnNumber;
      turn.turnPokemon = turnPokemon;
      battleObj.turns.push(turn)
      turnNumber++;
    }
    //Todo: Ver en review meet.
    const turnPokemonFinal = new TurnPokemon()
    const turnFinal = new Turn();
    turnFinal.turn_number = turnNumber;
    if (battleObj.turns[battleObj.turns.length - 1].turnPokemon.pokemon.id === pokemon1.id) {
      turnPokemonFinal.damage_done = 0;
      turnPokemonFinal.turn_hp = 0;
      turnPokemonFinal.pokemon = pokemon2;
    } else {
      turnPokemonFinal.damage_done = 0;
      turnPokemonFinal.turn_hp = 0;
      turnPokemonFinal.pokemon = pokemon1;
    }
    turnFinal.turn_number = turnNumber;
    turnFinal.turnPokemon = turnPokemonFinal;
    battleObj.turns.push(turnFinal)

    const battle = this.battleRepository.create({
      pokemon_losser: battleObj.turns[battleObj.turns.length - 1].turnPokemon.pokemon,
      pokemon_winner: battleObj.turns[battleObj.turns.length - 2].turnPokemon.pokemon,
    });
    await this.battleRepository.save(battle);
    // Iterar sobre cada turno
    for (const turnData of battleObj.turns) {
      // Crear TurnPokemon
      const turnPokemon = this.turnPokemonRepository.create({
        pokemon: turnData.turnPokemon.pokemon,  // Asegúrate de que `pokemon` solo contiene el ID
        damage_done: turnData.turnPokemon.damage_done,
        turn_hp: turnData.turnPokemon.turn_hp,
      });

      // Guardar TurnPokemon en la base de datos
      await this.turnPokemonRepository.save(turnPokemon);

      // Crear el turno
      const turn = this.turnRepository.create({
        battle,
        turn_number: turnData.turn_number,
        turnPokemon: turnPokemon,
      });

      // Guardar el turno en la base de datos
      await this.turnRepository.save(turn);


    }

    // Devolver la batalla con todos los turnos y turnPokemon almacenados
    return this.battleRepository.findOne({
      where: { id: battle.id },
      order: {
        id: 'DESC',
      },
      relations: ['pokemon_winner', 'pokemon_losser', 'turns', 'turns.turnPokemon', 'turns.turnPokemon', 'turns.turnPokemon.pokemon'],
    });
  }

  async findAll():Promise<BattleListDto> {
    const [battles, totalBattles] = await this.battleRepository.findAndCount({
      relations: ['pokemon_winner', 'pokemon_losser', 'turns', 'turns.turnPokemon', 'turns.turnPokemon', 'turns.turnPokemon.pokemon'],
    });
    const battleList = new BattleListDto();
    battleList.battles = battles;
    battleList.total_battles = totalBattles;
    return battleList;
  }

  findOne(id: number) {
    return `This action returns a #${id} battle`;
  }
}
