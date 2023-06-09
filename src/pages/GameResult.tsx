import React, { memo, useState, useCallback, useEffect } from "react";
import { SelectGame } from "../components/SelectGame";
import css from "./GameResultPage.module.css";
import { CircularProgress, SelectChangeEvent } from "@mui/material";

import { onValue, ref, set, push } from "firebase/database";
import { db } from "../services/firebase";
import { BattingResultTable } from "../components/BattingResultTable";
import { BaseButton } from "../components/atoms/button/BaseButton";
import { FirebaseService } from "../services/FirebaseService";
import {
  YesNoDialog,
  YesNoDialogProps,
  YesNoResult,
} from "../components/atoms/dialog/YesNoDialog";

type GameResult = {
  date: string;
  enemy: string;
  players: IBattingResult[];
};

export type GameResultEx = GameResult & { id: string };
export interface IBattingResult {
  name: string;
  field: number;
  results: string[];
}

export const GameResultPage = memo(() => {
  const MAX_PLAYER_NUM = 11;
  const MAX_BATTING_NUM = 6;
  const [gameResults, setGameResults] = useState<GameResultEx[]>([]);

  console.log("GameResultPageレンダリング: gameResults: ", gameResults);

  const [errMessage, setErrorMessage] = useState("");
  const [selectedGame, setSelectedGame] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [yesNoDialog, setYesNoDialog] = useState<YesNoDialogProps>({
    open: false,
    title: "",
    positiveLabel: "",
    negativeLabel: "",
  });

  useEffect(() => {
    console.log("firebase /results アクセス");
    const dbRef = ref(db, "/results");
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const snapshotValues: GameResult[] = snapshot.val();
        if (snapshotValues === null) {
          setErrorMessage("DB取得エラー");
          return;
        }
        const results = Object.entries(snapshotValues).map(([key, val]) => {
          return {
            id: key,
            ...val,
          };
        });

        setGameResults(results);

        // TODO: useEffectの依存配列が空なので、最初の時点でのselectedGameの値が入り続けている？？？
        // ためしに依存配列にselectedGameを指定したら、とりあえず期待通りの動き
        // ただしselectedGameが変わるたびにfirebaseにアクセスしてしまう
        setBattingResults([...results[selectedGame].players]);
        setErrorMessage("");
        setLoading(false);
      },
      { onlyOnce: true }
    );

    return () => {
      console.log("firebase unsbscribe");
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const createEmptyBattingResults = () => {
    return Array<IBattingResult>(MAX_PLAYER_NUM)
      .fill({ name: "", field: 0, results: [] })
      .map(() => {
        return {
          name: "",
          field: 1,
          results: Array(MAX_BATTING_NUM).fill(""),
        };
      });
  };

  const [battingResults, setBattingResults] = useState(
    createEmptyBattingResults()
  );

  const saveGameResult = () => {
    const dbRef = ref(db, "/results");
    const gameResult: GameResult = {
      date: "2022/1/1",
      enemy: "チャンプ",
      players: battingResults,
    };
    const childRef = push(dbRef);
    set(childRef, gameResult);
  };

  const dialogClose = (e: YesNoResult) => {
    setYesNoDialog({
      ...yesNoDialog,
      open: false,
    });
    if (e === YesNoResult.Yes) {
      FirebaseService.updatePlayerResult(
        gameResults[selectedGame].id,
        gameResults[selectedGame].players
      );

      console.log("更新完了！");
    }
  };

  const updatePlayersResult = () => {
    setYesNoDialog({
      open: true,
      title: "更新しますか？",
      positiveLabel: "はい",
      negativeLabel: "いいえ",
    });
  };

  const handleChangeSelectedGame = (event: SelectChangeEvent<string>) => {
    setSelectedGame(Number(event.target.value));
    setBattingResults([...gameResults[Number(event.target.value)].players]);
  };

  useCallback(() => {
    // []がないとこのコンポーネントがレンダリングされある都度動いてしまう
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <h2 className={css.title}>試合結果画面</h2>
          {errMessage || (
            <>
              <SelectGame
                gameResults={gameResults}
                selectedGame={selectedGame}
                handleChangeSelectedGame={handleChangeSelectedGame}
              />
              <BattingResultTable
                maxBattingNum={MAX_BATTING_NUM}
                battingResults={battingResults}
                setBattingResults={setBattingResults}
              ></BattingResultTable>
            </>
          )}
          <div>
            <BaseButton onClick={saveGameResult}>登録</BaseButton>
            <BaseButton onClick={updatePlayersResult}>更新</BaseButton>
          </div>
          <YesNoDialog
            open={yesNoDialog.open}
            handleClose={dialogClose}
            title={yesNoDialog.title}
            positiveLabel={yesNoDialog.positiveLabel}
            negativeLabel={yesNoDialog.negativeLabel}
          />
        </>
      )}
    </>
  );
});
