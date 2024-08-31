import { Battle } from "../../types/battle.interface";
import axiosInstance from "../axiosInstance.service"

interface Props {
    version?: number;
    signal?: AbortSignal;
}
export const getBattles = async ({
    version = 1,
    signal,
}: Props) => {
    const data = axiosInstance.get<Response>(`/v${version}/battle`, { signal });
    return data;
}

interface Response {
    battles: Battle[];
    total_battles: number;
}