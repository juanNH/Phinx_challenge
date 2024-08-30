import { Battle } from "../../types/battle.interface";
import axiosInstance from "../axiosInstance.service"

interface Props {
    version?: number;
    body: PostBattleBodyParams
}
interface PostBattleBodyParams {
    id_pokemon1: string;
    id_pokemon2: string;
}
export const postBattle = async ({
    version = 1,
    body
}: Props) => {

    const data = axiosInstance.post<Response>(`/v${version}/battle`, body);
    return data;

}

type Response = Battle 