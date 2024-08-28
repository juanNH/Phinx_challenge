import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Battle } from './battle.entity';
import { TurnPokemon } from './turnPokemon.entity';

@Entity()
export class Turn {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'Unique identifier for the turn' })
    id: string;

    @ManyToOne(() => Battle)
    @JoinColumn({ name: 'id_battle' })
    @ApiProperty({ description: 'The battle associated with this turn' })
    battle: Battle;
    
    @Column()
    @ApiProperty({ description: 'Turn number' })
    turn_number: number;

    @OneToOne(() => TurnPokemon, { cascade: true })
    @JoinColumn({ name: 'id_turnpokemon' })
    @ApiProperty({ description: 'The Pokémon involved in this turn' })
    turnPokemon: TurnPokemon;
}
