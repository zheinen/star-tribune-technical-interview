import { notFound } from "next/navigation";
import { articles } from "../../../hardcoded-data/articles";
import ArticleClient from "./ArticleClient";
import { FollowedAuthorsProvider } from "../../contexts/followed-authors-provider";

interface Props {
  params: { slug: string };
}

export default async function ArticlePage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <FollowedAuthorsProvider>
      <ArticleClient article={article} />
    </FollowedAuthorsProvider>
  );
}
