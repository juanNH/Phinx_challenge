import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Battle } from './entities/battle.entity';
import { TurnPokemon } from './entities/turnPokemon.entity';
import { Turn } from './entities/turn.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Pokemon, Battle, Turn, TurnPokemon])],
  controllers: [BattleController],
  providers: [BattleService]
})
export class BattleModule {}
