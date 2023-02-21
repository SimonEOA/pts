import { pusher } from "@/lib/pusher";
import { UserAuthResponse } from "pusher";

const handler = (
  req: {
    body: {
      socket_id: any;
      channel_name: any;
      username: any;
      userLocation: any;
    };
  },
  res: { send: (arg0: UserAuthResponse) => void }
) => {
  // see https://pusher.com/docs/channels/server_api/authenticating-users
  const { socket_id, channel_name, username, userLocation } = req.body;

  // use JWTs here to authenticate users before continuing

  const randomString = Math.random().toString(36).slice(2);

  const presenceData = {
    id: randomString,
    user_info: {
      name: username,
    },
  };

  try {
    const auth = pusher.authenticateUser(socket_id, presenceData);
    res.send(auth);
  } catch (error) {
    console.error(error);
  }
};

export default handler;
