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
  const { socket_id, channel_name } = req.body;

  try {
    const auth = pusher.authorizeChannel(socket_id, channel_name);
    res.send(auth);
  } catch (error) {
    console.error(error);
  }
};

export default handler;
