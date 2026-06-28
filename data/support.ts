export interface SupportItem {
  title: string;
  link: string;
  description: string;
  icon: string;
  discord?: string;
}

export const support: SupportItem[] = [
  {
    title: "PiratexPlay",
    link: "https://piratexplay.cc",
    description: "Indian best Anime Streaming Platform created by my friend",
    icon: "fa-solid fa-play",
    discord: "https://discord.gg/6Rmethn3jn",
  },
  {
    title: "Woozlit",
    link: "#",
    description: "AI Chatbot created by my friend",
    icon: "fa-solid fa-robot",
    discord: "https://discord.gg/rdBN6TYf66",
  },
  {
    title: "Popr.ink",
    link: "#",
    description: "Movie/Anime Streaming Aggregator created by my friend",
    icon: "fa-solid fa-film",
    discord: "https://discord.gg/dherBjSCRT",
  },
];
