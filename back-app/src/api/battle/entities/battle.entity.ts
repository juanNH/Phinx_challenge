import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Pokemon } from 'src/api/pokemon/entities/pokemon.entity';
import { Turn } from './turn.entity';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the battle' })
  id: string;

  @ManyToOne(() => Pokemon)
  @JoinColumn({ name: 'id_winner' })
  @ApiProperty({ description: 'The Pokémon that won the battle' })
  pokemon_winner: Pokemon;

  @ManyToOne(() => Pokemon)
  @JoinColumn({ name: 'id_losser' })
  @ApiProperty({ description: 'The Pokémon that lost the battle' })
  pokemon_losser: Pokemon;

  @OneToMany(() => Turn, turn => turn.battle)
  @ApiProperty({ description: 'Turns associated with this battle'})
  turns: Turn[];
}
