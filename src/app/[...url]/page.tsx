import { ChatComponent } from "../component/ChatComponent";
import { ragChat } from "../lib/rag";
import { redis } from "../lib/redis";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstruct({ url }: { url: string[] }) {
  const reconstructedUrl = url.map((component) =>
    decodeURIComponent(component)
  );
  return reconstructedUrl.join("/");
}

const Page = async ({ params }: PageProps) => {
  const reconstructed = reconstruct({ url: params.url as string[] });
  const isAlreadyExists = await redis.sismember("indexed-url", reconstructed);
  console.log(isAlreadyExists);

  const sessionId = "mock-session";

  if (!isAlreadyExists) {
    await ragChat.context.add({
      type: "html",
      source: reconstructed,
      config: { chunkSize: 200, chunkOverlap: 50 },
    });
  }

  await redis.sadd("indexed-url", reconstructed);
  return <ChatComponent sessionId={sessionId} />;
};

export default Page;
