import axios from "axios";
import API_ROUTES from "../constants/routes";

const getCategoryPosts = async (category) => {
  const posts = await axios({
    method: "get",
    url: API_ROUTES[category].url,
  });

  return posts;
};

export default getCategoryPosts;
