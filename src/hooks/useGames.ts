import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import type { Platform } from "./usePlatforms";
import useGameQueryStore from "../store";

const apiClient = new APIClient<Game>("/games");

export interface Game {
  id: number;
  name: string;
  slug: string;
  description_raw: string;
  background_image: string;
  description: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  return useInfiniteQuery({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export default useGames;
