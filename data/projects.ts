export interface Project {
  title: string;
  link: string;
  description: string;
  icon: string;
  source?: string;
}

export const projects: Project[] = [
  {
    title: "The Way of Internet",
    link: "https://thewayofinternet.pages.dev",
    description: "A ultimate summarised version of populer free media indexes",
    icon: "fa-solid fa-folder-open",
    source: "https://github.com/Internet-Way/TheWayofInternet",
  },
  {
    title: "A Project",
    link: "#",
    description: "Currently private, will public soon",
    icon: "fa-solid fa-folder",
  },
  {
    title: "A Project",
    link: "#",
    description: "Currently private, will public soon",
    icon: "fa-solid fa-folder",
  },
];
