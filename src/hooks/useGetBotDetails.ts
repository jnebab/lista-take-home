import bots from "../mock/bots";
import useLocalStorage from "./useLocalStorage";

export default function useGetBotDetails(id: string) {
  const [localBots] = useLocalStorage("LISTA_BOTS", bots);
  return localBots.find((localBot) => localBot.id === id) || undefined;
}
