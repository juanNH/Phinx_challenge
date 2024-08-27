import {
  Controller,
  Get,
  HttpStatus
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ApiErrorDecorator } from 'src/commons/decorator/error.decorator';
import { PokemonListDto } from './dto/pokemon-list.dto';

@Controller('pokemon')
@ApiTags('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  /**
   * Controller to get pokemon list and count.
   * @returns {PokemonListDto}  List and count of pokemons.
   */
  @Get()
  @ApiOperation({summary: 'Obtains list of pokemons.'})
  @ApiResponse({
    status:200,
    description: 'Pokemon list.',
    schema:{
      $ref: getSchemaPath(PokemonListDto)
    },
    type:PokemonListDto,
  })
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server')
  findAll() {
    return this.pokemonService.findAll();
  }
}
