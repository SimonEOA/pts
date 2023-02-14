import { pusher } from "@/lib/pusher";
import { ChannelAuthResponse } from "pusher";

const handler = (
  req: {
    body: {
      socket_id: any;
      channel_name: any;
    };
  },
  res: { send: (arg0: ChannelAuthResponse) => void }
) => {
  // see https://pusher.com/docs/channels/server_api/authenticating-users
  const { socket_id, channel_name } = req.body;

  // use JWTs here to authenticate users before continuing

  try {
    const auth = pusher.authorizeChannel(socket_id, channel_name);
    res.send(auth);
  } catch (error) {
    console.error(error);
  }
};

export default handler;
