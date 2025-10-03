import { SimpleGrid } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCards from "./GameCards";

const GameGrid = () => {
  const { games, error } = useGames();
  return (
    <>
      {error && <div>{error}</div>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={10}
        padding={5}
      >
        {games.map((game) => (
          <GameCards key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
