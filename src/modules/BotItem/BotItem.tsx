import useLocalStorage from "../../hooks/useLocalStorage";
import bots from "../../mock/bots";
import AddBotForm from "../AddBotForm";
import { useState } from "react";
const baseURL = `https://avatars.dicebear.com/api/bottts`;

export type Bot = {
  id: string;
  name: string;
  description: string;
};

export default function BotItem({
  bot,
  onRemoveBot,
  onEditBot,
}: {
  bot: Bot;
  onRemoveBot: (filteredBots: Bot[]) => void;
  onEditBot: (updatedBots: Bot[]) => void;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [localBots, setLocalBots] = useLocalStorage("LISTA_BOTS", bots);
  const url = `${baseURL}/${bot.id}.svg`;

  const handleEditForm = () => {
    setIsEdit((old) => !old);
  };

  const handleRemoveBot = () => {
    const filteredBots = localBots.filter((localBot) => localBot.id !== bot.id);
    onRemoveBot(filteredBots);
  };

  return (
    <div className="bg-transgray rounded-2xl py-8 lg:py-3 px-8 w-full text-white flex flex-col lg:flex-row items-center lg:justify-between gap-4 lg:gap-0">
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">
        <div>
          <img src={url} alt={bot.name} className="w-16 h-16 lg:w-12 lg:h-12" />
        </div>
        <div className="text-center w-full lg:text-left">
          <h3 className="text-xl capitalize font-semibold">{bot.name}</h3>
          <p>{bot.description}</p>
        </div>
      </div>
      {isEdit ? (
        <AddBotForm
          onCancel={handleEditForm}
          onEditBot={onEditBot}
          bot={bot}
          edit
        />
      ) : (
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 w-full lg:w-fit">
          <button
            onClick={handleEditForm}
            className="btn bg-seledyn-600 text-white rounded-lg hover:bg-seledyn-500 font-semibold w-full lg:w-fit"
          >
            View
          </button>
          <button
            onClick={handleEditForm}
            className="btn border border-seledyn-600 text-seledyn-600 rounded-lg hover:bg-seledyn-600 hover:text-white font-semibold w-full lg:w-fit"
          >
            Edit
          </button>
          <button
            onClick={handleRemoveBot}
            className="btn bg-cabaret-600 text-white rounded-lg hover:bg-cabaret-500 font-semibold w-full lg:w-fit"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
