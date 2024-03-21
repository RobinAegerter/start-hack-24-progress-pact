import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ChatBotComponent from "./Chatbot";

export default async function Chat() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  let userImageUrl = "/default_user.png";
  if (session.user.image) {
    userImageUrl = session.user.image;
  }

  return <ChatBotComponent userImage={userImageUrl} />;
}
