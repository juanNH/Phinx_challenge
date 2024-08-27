import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name:'pokemon'})
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the Pokémon' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Name of the Pokémon' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Attack stat of the Pokémon' })
  attack: number;

  @Column()
  @ApiProperty({ description: 'Defense stat of the Pokémon' })
  defense: number;

  @Column()
  @ApiProperty({ description: 'HP stat of the Pokémon' })
  hp: number;

  @Column()
  @ApiProperty({ description: 'Speed stat of the Pokémon' })
  speed: number;

  @Column()
  @ApiProperty({ description: 'Type of the Pokémon' })
  type: string;

  @Column()
  @ApiProperty({ description: 'Image URL of the Pokémon' })
  imageUrl: string;
}
