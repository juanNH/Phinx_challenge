import { Pokemon } from "../../types/pokemon.interface";
import axiosInstance from "../axiosInstance.service"

interface Props {
    version?: number;
    signal?: AbortSignal;
}
export const getPokemons = async ({
    version = 1,
    signal
}: Props) => {

    const data = axiosInstance.get<Response>(`/v${version}/pokemon`, { signal });
    return data;

}

interface Response {
    pokemons: Pokemon[];
    total_pokemons: number;
}