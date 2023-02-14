import { pusher } from "../../../lib/pusher";

// presence channel handler
export default async function handler(req, res) {
  const { message, member, channelName } = req.body;
  // trigger a new post event via pusher
  await pusher.trigger("presence-" + channelName, "chat-update", {
    member: member,
    message: message,
  });

  res.json({ status: 200 });
}
