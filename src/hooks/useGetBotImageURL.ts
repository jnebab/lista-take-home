const baseURL = `https://avatars.dicebear.com/api/bottts`;

export default function useGetBotImageURL(id: string): string {
  return `${baseURL}/${id}.svg`;
}
