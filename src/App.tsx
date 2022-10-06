import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import AddBotForm from "./modules/AddBotForm";
import BotItem, { Bot } from "./modules/BotItem/BotItem";
import useLocalStorage from "./hooks/useLocalStorage";
import { useDebounce } from "./hooks/useDebounce";
import bots from "./mock/bots";

function App() {
  const [localBots, setLocalBots] = useLocalStorage("LISTA_BOTS", bots);
  const [showAddForm, setShowAddForm] = useState(false);
  const [listaBots, setListaBots] = useState<Bot[]>(localBots);
  const [listaBotsListRef] = useAutoAnimate();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    handleFilterBots();
  }, [debouncedSearchText]);

  const handleAddFormView = () => {
    setShowAddForm((old) => !old);
  };

  const handleAddBot = (bot: Bot) => {
    setListaBots([...listaBots, bot]);
    setLocalBots([...localBots, bot]);
  };

  const handleEditBot = (updatedBots: Bot[]) => {
    setListaBots(updatedBots);
    setLocalBots(updatedBots);
  };

  const handleRemoveBot = (filteredBots: Bot[]) => {
    setListaBots(filteredBots);
    setLocalBots(filteredBots);
  };

  const handleFilterBots = () => {
    if (debouncedSearchText === "") {
      setListaBots(localBots);
      return;
    }
    const filteredBots = listaBots.filter(
      (listaBot) => listaBot.name.toLowerCase() === debouncedSearchText
    );
    setListaBots(filteredBots);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <main className="h-screen w-screen bg-black">
      <div className="h-full w-full max-w-[1440px] mx-auto flex flex-col justify-start items-center py-[45px] px-[80px]">
        <div className="flex items-center w-full justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Lista Bots</h1>
          <div>
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  className="input border border-almostBlack focus:outline-none"
                  onChange={handleSearchInputChange}
                />
                <button className="btn btn-square bg-almostBlack">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center w-full mb-8 ">
          {showAddForm ? (
            <AddBotForm onCancel={handleAddFormView} onAddBot={handleAddBot} />
          ) : (
            <button
              onClick={handleAddFormView}
              className="btn bg-seledyn-600 text-white rounded-lg hover:bg-seledyn-500 font-semibold"
            >
              Add new bot
            </button>
          )}
        </div>
        <div
          className="w-full flex flex-col gap-6"
          ref={listaBotsListRef as any}
        >
          {listaBots.map((bot) => (
            <BotItem
              key={bot.id}
              bot={bot}
              onRemoveBot={handleRemoveBot}
              onEditBot={handleEditBot}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
