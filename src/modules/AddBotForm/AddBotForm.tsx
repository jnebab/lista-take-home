import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Bot } from "../BotItem/BotItem";
import bots from "../../mock/bots";

export default function AddBotForm({
  onCancel,
  onAddBot,
  onEditBot,
  bot,
  edit,
}: {
  onCancel: () => void;
  bot?: Bot;
  edit?: boolean;
  onAddBot?: (bot: Bot) => void;
  onEditBot?: (updatedBots: Bot[]) => void;
}) {
  const [localBots] = useLocalStorage("LISTA_BOTS", bots);
  const [botName, setBotName] = useState("");
  const [botDesc, setBotDesc] = useState("");

  const handleBotNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBotName(e.target.value);
  };

  const handleBotDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBotDesc(e.target.value);
  };

  const handleAddNewBot = () => {
    !!onAddBot &&
      onAddBot({
        name: botName,
        description: botDesc,
        id: uuidv4(),
      });
    onCancel();
  };

  const handleEditBot = () => {
    const updatedBots = [...localBots].map((localBot) => {
      if (localBot.id === bot?.id) {
        return {
          ...bot,
          name: botName || (bot?.name as string),
          description: botDesc || (bot?.description as string),
        };
      }
      return localBot;
    });
    !!onEditBot && onEditBot(updatedBots);
    onCancel();
  };

  return (
    <div>
      <div className="form-control flex lg:flex-row gap-4 ">
        <input
          onChange={handleBotNameChange}
          defaultValue={bot?.name}
          type="text"
          placeholder="Type desired bot name"
          className="input input-bordered rounded-lg focus:outline-none text-almostBlack"
        />
        <input
          onChange={handleBotDescChange}
          defaultValue={bot?.description}
          type="text"
          placeholder="Type bot purpose or description..."
          className="input text-almostBlack input-bordered w-[300px] rounded-lg focus:outline-none"
        />
        <button
          onClick={() => {
            if (edit) {
              handleEditBot();
            } else {
              handleAddNewBot();
            }
          }}
          disabled={!edit && (!botName || !botDesc)}
          className="btn disabled:bg-seledyn-200 disabled:text-gray-400 bg-seledyn-600 text-white rounded-lg hover:bg-seledyn-500 font-semibold"
        >
          {edit ? "Update bot" : "Add new bot"}
        </button>
        <button
          onClick={onCancel}
          className="btn border border-seledyn-600 text-seledyn-600 rounded-lg hover:bg-seledyn-600 hover:text-white font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
