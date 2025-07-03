"use client";

import Link from "next/link";
import { authors } from "../../../hardcoded-data/authors";
import { useFollowedAuthors } from "../../hooks/followed-authors-hooks";

interface Article {
  slug: string;
  title: string;
  author: string;
  date: string;
  image?: string;
  content: string;
}

interface ArticleClientProps {
  article: Article;
}

export default function ArticleClient({ article }: ArticleClientProps) {
  const { followedAuthors } = useFollowedAuthors();

  const author = authors.find((author) => author.name === article.author);
  const isFollowing = followedAuthors.includes(article.author);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-primary-emerald-green">
        {article.title}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        By{" "}
        <Link
          href={author ? `/author/${author.slug}` : "#"}
          className="hover:underline"
        >
          {article.author}
        </Link>{" "}
        {isFollowing ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
            Following
          </span>
        ) : null}
        · {article.date}
      </p>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full rounded-md mb-6"
        />
      )}
      <article className="prose prose-green">
        <p>{article.content}</p>
      </article>
    </main>
  );
}
