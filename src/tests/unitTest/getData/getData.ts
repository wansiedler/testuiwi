import axios from "axios";

export const getData = async () => {
      try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            const userIds = response.data.map((user) => user.id);
            return userIds;
      } catch (e) {
      }
};

