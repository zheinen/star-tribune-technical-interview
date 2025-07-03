import { createContext } from "react";

export interface FollowedAuthorsType {
  followedAuthors: string[];
  unfollowAuthor: (authorSlug: string) => void;
  followAuthor: (authorSlug: string) => void;
}

export const FollowedAuthorsContext = createContext<FollowedAuthorsType>({
  followedAuthors: [],
  unfollowAuthor: () => {},
  followAuthor: () => {},
});
