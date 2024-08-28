import { Pokemon } from "src/api/pokemon/entities/pokemon.entity"

export const calculateDamage = (attacker: Pokemon, defender: Pokemon): number => {
    const damage = attacker.attack - defender.defense;
    if (damage <= 0) {
        defender.hp -= 1;
        return 1;
    } else {
        defender.hp -= damage;
        return damage;
    }
}