import React from "react";
import { EditableCell } from "./EditableCell";
import { SelectField } from "./SelectField";
import css from "./BattingResultTable.module.css";
import { IBattingResult } from "../pages/GameResult";
import { SelectChangeEvent } from "@mui/material";

type propsType = {
  maxBattingNum: number;
  battingResults: IBattingResult[];
  setBattingResults: React.Dispatch<React.SetStateAction<IBattingResult[]>>;
};

export const BattingResultTable = ({
  maxBattingNum,
  battingResults,
  setBattingResults,
}: propsType) => {
  const onUpdateName = (playerIndex: number, value: string) => {
    battingResults[playerIndex].name = value;
    setBattingResults([...battingResults]);
  };

  const onUpdateBattingResult = (
    playerIndex: number,
    resultIndex: number,
    value: string
  ) => {
    battingResults[playerIndex].results[resultIndex] = value;
    setBattingResults([...battingResults]);
  };

  const onUpdateField = (event: SelectChangeEvent) => {
    const playerIndex = Number(event.target.name);
    const value = Number(event.target.value);
    battingResults[playerIndex].field = value;
    // 新たな参照として更新しないと、変更検知されない
    setBattingResults([...battingResults]);
  };

  return (
    <div className={css.container}>
      <table className={css.order}>
        <thead>
          <tr>
            <th className={css.bOrder}>順</th>
            <th className={css.bName}>名前</th>
            <th className={css.bField}>守備</th>
            {Array(maxBattingNum)
              .fill(0)
              .map((_, i) => (
                <th className={css.bTurn} key={"bTurn" + i + 1}>
                  {i + 1}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {battingResults.map((player, playerIndex) => (
            <tr className={css.result} key={`${player.name}${playerIndex}`}>
              <td>{playerIndex + 1}</td>
              <td>
                <EditableCell
                  value={player.name}
                  onUpdate={(value: string) => {
                    onUpdateName(playerIndex, value);
                  }}
                ></EditableCell>
              </td>
              <td>
                <SelectField
                  handleChangeField={onUpdateField}
                  selectedValue={battingResults[playerIndex].field}
                  playerIndex={playerIndex}
                />
              </td>
              {player.results.map((result, resultIndex) => (
                <td key={`${result}${resultIndex}`}>
                  <EditableCell
                    value={result}
                    onUpdate={(value: string) => {
                      onUpdateBattingResult(playerIndex, resultIndex, value);
                    }}
                  ></EditableCell>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
