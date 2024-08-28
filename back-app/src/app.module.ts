import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './api/pokemon/pokemon.module';
import { Pokemon } from './api/pokemon/entities/pokemon.entity';
import { Battle } from './api/battle/entities/battle.entity';
import { Turn } from './api/battle/entities/turn.entity';
import { TurnPokemon } from './api/battle/entities/turnPokemon.entity';
import { BattleModule } from './api/battle/battle.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/database.db',
      entities: [Pokemon, Battle, Turn, TurnPokemon],
      synchronize: true,
    }),
    PokemonModule,
    BattleModule,
  ],
})
export class AppModule {}
