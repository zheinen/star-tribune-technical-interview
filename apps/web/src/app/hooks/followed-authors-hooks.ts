import { useContext } from "react";
import { FollowedAuthorsContext } from "../contexts/followed-authors-context";

export const useFollowedAuthors = () => {
  const authorsContext = useContext(FollowedAuthorsContext);

  if (!authorsContext) {
    throw new Error(
      "useFollowedAuthors must be used within a FollowedAuthorsProvider"
    );
  }

  return authorsContext;
};
