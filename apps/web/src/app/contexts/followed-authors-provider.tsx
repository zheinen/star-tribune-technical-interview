"use client";

import { FunctionComponent, useEffect, useState } from "react";
import {
  FollowedAuthorsContext,
  FollowedAuthorsType,
} from "./followed-authors-context";

interface AuthorProviderProps {
  children: React.ReactNode;
}
const getInitialState = () => {
  const currentAuthors = window.localStorage.getItem("currentAuthors");
  return currentAuthors ? JSON.parse(currentAuthors) : null;
};
export const FollowedAuthorsProvider: FunctionComponent<AuthorProviderProps> =
  ({ children }) => {
    const [followedAuthors, setFollowedAuthors] = useState<string[]>(
      getInitialState()
    );

    useEffect(() => {
      window.localStorage.setItem(
        "currentAuthors",
        JSON.stringify(followedAuthors)
      );
    }, [followedAuthors]);
    const followAuthor = (newAuthor: string) => {
      setFollowedAuthors([...followedAuthors, newAuthor]);
    };
    const unfollowAuthor = (authorToUnfollow: string) => {
      console.log(authorToUnfollow);
      setFollowedAuthors(
        followedAuthors.filter((author: string) => author !== authorToUnfollow)
      );
    };
    const followedAuthorsContextValue: FollowedAuthorsType = {
      followedAuthors,
      followAuthor,
      unfollowAuthor,
    };

    return (
      <FollowedAuthorsContext.Provider value={followedAuthorsContextValue}>
        {children}
      </FollowedAuthorsContext.Provider>
    );
  };
