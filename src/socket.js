
// import { io } from "socket.io-client";
// import { useAuthContext } from "./hooks/useAuthContext";
// const socketConnection= ()=> {
//    const {user}= useAuthContext();
//     const userid = user && user.userid;
//     const username= user && user.email;
//     const socket = new io("http://localhost:4000", {
//       autoConnect: false,
//       withCredentials: true,
//       query: {
//         userid,
//         username,
//       },
//     });
//     return socket;
// }
// export default socketConnection;
import { io } from "socket.io-client";
import { useAuthContext } from "./hooks/useAuthContext";

let socket; // Declare a variable to store the socket instance

const createSocketInstance = () => {
  const { user } = useAuthContext();
  const userid = user && user.userid;
  const username = user && user.email;

  return io("http://localhost:4000", {
    autoConnect: false,
    withCredentials: true,
    query: {
      userid,
      username,
    },
  });
};

const getSocketInstance = () => {
  if (!socket) {
    // If the socket instance doesn't exist, create it
    socket = createSocketInstance();
  }

  return socket;
};

export default getSocketInstance;
