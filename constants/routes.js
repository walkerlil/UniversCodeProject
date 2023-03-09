const API_ROUTES = [
  {
    name: "Hot",
    url: process.env.REDDIT_HOT,
    icon: "fire",
    color: "orange",
  },
  {
    name: "Top",
    url: process.env.REDDIT_TOP,
    icon: "star",
    color: "gold",
  },
  {
    name: "New",
    url: process.env.REDDIT_NEW,
    icon: "clock",
    color: "lightblue",
  },
  {
    name: "Controversial",
    url: process.env.REDDIT_CONTROVERSIAL,
    icon: "alert",
    color: "red",
  },
];

export default API_ROUTES;
