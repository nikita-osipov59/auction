import axios from "axios";

export const getCards = async () => {
  const response = await axios
    .get(import.meta.env.VITE_API_KEY, {
      headers: {
        accept: "application/json",
      },
    })
    .then(({ data }) => {
      const res = data;
      return res;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};
