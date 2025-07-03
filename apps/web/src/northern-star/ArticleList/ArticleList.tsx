"use client";

import ArticlePreview from "../ArticlePreview/ArticlePreview";
import type { Article } from "../ArticlePreview/ArticlePreview";
import { useFollowedAuthors } from "../../app/hooks/followed-authors-hooks";

type ArticleListProps = {
  articles: Article[];
  title?: string;
  noArticlesMessage?: string;
};

function sortArticlesByImage(articlesList: Article[]) {
  const withImages = articlesList.filter((a) => a.image);
  const withoutImages = articlesList.filter((a) => !a.image);
  return [...withImages, ...withoutImages];
}

export default function ArticleList({
  articles,
  title,
  noArticlesMessage = "No articles found.",
}: ArticleListProps) {
  const { followedAuthors } = useFollowedAuthors();
  const sortedArticles = sortArticlesByImage(articles);
  const groupedArticlesByFavoriteAuthors = sortedArticles.sort((a, b) => {
    const isAFavorite = followedAuthors.includes(a.author);
    const isBFavorite = followedAuthors.includes(b.author);
    if (isAFavorite && !isBFavorite) {
      return -1;
    } else if (!isAFavorite && isBFavorite) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <section className="mb-12">
      {title && (
        <h2 className="text-2xl font-semibold mb-4 text-emerald-700">
          {title}
        </h2>
      )}
      {groupedArticlesByFavoriteAuthors.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {groupedArticlesByFavoriteAuthors.map((article) => (
            <ArticlePreview article={article} key={article.slug} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700">{noArticlesMessage}</p>
      )}
    </section>
  );
}
