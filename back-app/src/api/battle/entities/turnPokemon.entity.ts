import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Turn } from './turn.entity';
import { Pokemon } from 'src/api/pokemon/entities/pokemon.entity';

@Entity()
export class TurnPokemon {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'Unique identifier for the TurnPokemon record' })
    id: string;

    @ManyToOne(() => Turn)
    @JoinColumn({ name: 'id_turn' })
    @ApiProperty({ description: 'The turn associated with this record' })
    turn: Turn;

    @ManyToOne(() => Pokemon)
    @JoinColumn({ name: 'id_pokemon' })
    @ApiProperty({ description: 'The Pokémon associated with this record' })
    pokemon: Pokemon;

    @Column()
    @ApiProperty({ description: 'Current HP of the Pokémon in this turn' })
    turn_hp: number;

    @Column()
    @ApiProperty({ description: 'Current damage done in actual turn' })
    damage_done: number;
}
