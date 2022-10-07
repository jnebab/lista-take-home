import useGetBotDetails from "../hooks/useGetBotDetails";
import { useNavigate, useParams } from "react-router-dom";
import useGetBotImageURL from "../hooks/useGetBotImageURL";

export default function Bot() {
  const params = useParams();
  const navigate = useNavigate();
  const bot = useGetBotDetails(params?.botId as string);
  const url = useGetBotImageURL(params?.botId as string);

  return (
    <main className="lg:h-screen h-screen w-screen text-white">
      <div className="h-full w-full max-w-[1440px] mx-auto flex flex-col justify-start items-center p-6 lg:py-[45px] lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center w-full justify-between mb-10">
          <h1 className="text-3xl font-bold text-white">Lista Bots</h1>
        </div>
        <div className="mb-6">
          <img
            src={url}
            alt={bot?.name}
            className="w-16 h-16 lg:w-20 lg:h-20"
          />
        </div>
        <div className="text-center w-full flex justify-center flex-col gap-4">
          <h3 className="text-5xl">
            Hi, my name is{" "}
            <span
              className="font-bold capitalize bg-gradient-to-b from-seledyn-500 to-cabaret-500 bg-clip-text"
              style={{
                WebkitTextFillColor: "transparent",
              }}
            >
              {bot?.name}
            </span>
          </h3>
          <p className="text-lg">{bot?.description}</p>
          <button
            onClick={() => navigate("/")}
            className="btn self-center bg-seledyn-600 text-white rounded-lg hover:bg-seledyn-500 font-semibold w-fit"
          >
            Back to List
          </button>
        </div>
      </div>
    </main>
  );
}
