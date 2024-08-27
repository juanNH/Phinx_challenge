import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Battle } from './battle.entity';

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
}
