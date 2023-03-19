import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { GameResultEx } from "../pages/GameResult";
import styled from "styled-components";

const StyledOpponentContainer = styled.div`
  display: flex;
  align-items: center;
`;

type propsType = {
  gameResults: GameResultEx[];
  selectedGame: number;
  handleChangeSelectedGame: (event: SelectChangeEvent<string>) => void;
};

export const SelectGame = ({
  gameResults,
  selectedGame,
  handleChangeSelectedGame,
}: propsType) => {
  return (
    <StyledOpponentContainer>
      対戦相手：
      {gameResults.length > 0 ? (
        <FormControl>
          <Select
            value={String(selectedGame)}
            onChange={handleChangeSelectedGame}
          >
            {gameResults.map((result, index) => {
              return (
                <MenuItem value={index} key={`${index}-${result.enemy}`}>
                  {`${result.date} - ${result.enemy}`}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        "---"
      )}
    </StyledOpponentContainer>
  );
};
