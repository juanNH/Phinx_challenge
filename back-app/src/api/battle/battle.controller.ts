import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleDto } from './dto/battle.dto';
import { ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ApiErrorDecorator } from 'src/commons/decorator/error.decorator';
import { BattleListDto } from './dto/battle-list.dto.';
import { Battle } from './entities/battle.entity';

@Controller({ path: 'battle', version: '1' })
@ApiTags('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) { }

  /**
 * Controller to start a battle beetwen 2 pokemons.
 * @param {BattleDto} battleDto DTO for the battle.
 * @returns {any} Returns table data.
 */
  @Post()
  @ApiOperation({ summary: 'Calculates who wins the battle' })
  @ApiResponse({
    status: 200,
    description: 'Result of battle',
    schema: {
      $ref: getSchemaPath(Battle),
    },
    type: Battle
  })
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server')
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Can not found pokemon!')
  battle(@Body() battleDto: BattleDto) {
    return this.battleService.battle(battleDto);
  }


  /**
* Controller get battle list.
* @param {BattleDto} battleDto DTO for the battle.
* @returns {BattleListDto} Returns battle list.
*/
  @Get()
  @ApiOperation({ summary: 'Returns all battles' })
  @ApiResponse({
    status: 200,
    description: 'Result of battles',
    schema: {
      $ref: getSchemaPath(BattleListDto),
    },
    type: BattleListDto
  })
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server')
  findAll() {
    return this.battleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.battleService.findOne(+id);
  }

}
