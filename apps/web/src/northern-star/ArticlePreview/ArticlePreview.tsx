"use client";

import Link from "next/link";
import { useFollowedAuthors } from "../../app/hooks/followed-authors-hooks";

export type Article = {
  title: string;
  slug: string;
  author: string;
  date: string;
  summary: string;
  image?: string;
};

export default function ArticlePreview({ article }: { article: Article }) {
  const { followedAuthors } = useFollowedAuthors();

  const isFollowing = followedAuthors.includes(article.author);
  return (
    <Link
      href={`/article/${article.slug}`}
      className="block bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition"
    >
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{article.title}</h2>
        <h3 className="text-s text-gray-700">{`by ${article.author}`}</h3>
        {isFollowing ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
            Following
          </span>
        ) : null}
        <p className="text-gray-700">{article.summary}</p>
      </div>
    </Link>
  );
}
