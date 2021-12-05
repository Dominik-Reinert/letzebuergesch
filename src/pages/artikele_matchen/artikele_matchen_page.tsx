/**@jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { proxy, useSnapshot } from "valtio";
import { useUpdateOnStoreChange } from "../../store/use_update_on_store_change";
import { Sex, wordStore } from "../../store/word_store";
import { useStyleContext } from "../../style_context/use_style_context";
import { ArtikeleMatchenPageFallback } from "./artikele_matchen_fallback";
import { artikeleMatchenPageSuspendingStyle } from "./artikele_matchen_page_style";

export function ArtikeleMatchenPage(): JSX.Element {
  return (
    <React.Suspense fallback={<ArtikeleMatchenPageFallback />}>
      <ArtikeleMatchenPageSuspending />
    </React.Suspense>
  );
}

const nAllowedRule = ["h", "a", "t", "z", "i", "y", "e", "n", "d", "u", "o"];

enum Artikele {
  DE = "De",
  DEN = "Den",
  D = "D'",
}

enum ResolvedState {
  OPEN = "OPEN",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
}
const currentState: {
  index: number;
  showTranslation: boolean;
  resolvedState: ResolvedState;
  resolvedArtikele?: Artikele;
} = proxy({
  index: 0,
  showTranslation: false,
  resolvedState: ResolvedState.OPEN,
});

const ArtikeleMatchenPageSuspending = () => {
  const styleContext = useStyleContext();
  useUpdateOnStoreChange(wordStore);

  const words = wordStore.getCurrentDataAdapted().words;
  const componentState = useSnapshot(currentState);
  const currentWord = words[componentState.index];

  function transitionToOpen(): void {
    currentState.resolvedState = ResolvedState.OPEN;
    currentState.resolvedArtikele = undefined;
    currentState.showTranslation = false;
    currentState.index++;
  }

  function showTranslation(): void {
    currentState.showTranslation = true;
  }

  function restart(): void {
    currentState.index = 0;
  }

  const resolvedStateClass =
    componentState.resolvedState === ResolvedState.CORRECT
      ? "correct"
      : componentState.resolvedState === ResolvedState.INCORRECT
      ? "incorrect"
      : "";

  return (
    <div
      css={artikeleMatchenPageSuspendingStyle(styleContext)}
      onClick={() =>
        componentState.resolvedState !== ResolvedState.OPEN &&
        transitionToOpen()
      }
    >
      <div className="width-wrapper">
        <div className={`word-card ${resolvedStateClass}`}>
          <div className="help">
            <span onClick={() => restart()}>nei starten</span>
            <span onClick={() => showTranslation()}>?</span>
          </div>
          <div className="word">
            <span>{currentWord?.singular}</span>
          </div>
          <div className="translation">
            <span>
              {componentState.showTranslation &&
                `(${currentWord?.translation})`}
            </span>
          </div>
        </div>
        <div className="artikelen">
          {[Artikele.D, Artikele.DE, Artikele.DEN].map((artikele) => {
            return (
              <ArtikeleOption
                key={`${artikele}-option`}
                artikele={artikele}
                resolvedStateClass={resolvedStateClass}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

function ArtikeleOption(props: {
  artikele: Artikele;
  resolvedStateClass: string;
}): JSX.Element {
  const componentState = useSnapshot(currentState);
  const words = wordStore.getCurrentDataAdapted().words;
  const currentWord = words[componentState.index];

  function transitionToIncorrect(artikele: Artikele): void {
    currentState.resolvedState = ResolvedState.INCORRECT;
    currentState.resolvedArtikele = artikele;
  }

  function transitionToCorrect(artikele: Artikele): void {
    currentState.resolvedState = ResolvedState.CORRECT;
    currentState.resolvedArtikele = artikele;
  }

  function handleArtikeleClick(artikele: Artikele): void {
    switch (artikele) {
      case Artikele.D:
        [Sex.WEIBLECH, Sex.SAECHLECH].includes(currentWord.sex)
          ? transitionToCorrect(artikele)
          : transitionToIncorrect(artikele);
        break;
      case Artikele.DE:
        currentWord.sex === Sex.MAENNLECH &&
        !nAllowedRule.includes(currentWord.singular[0].toLocaleLowerCase())
          ? transitionToCorrect(artikele)
          : transitionToIncorrect(artikele);
        break;
      case Artikele.DEN:
        currentWord.sex === Sex.MAENNLECH &&
        nAllowedRule.includes(currentWord.singular[0].toLocaleLowerCase())
          ? transitionToCorrect(artikele)
          : transitionToIncorrect(artikele);
    }
  }

  return (
    <div
      className={`artikele-option ${
        componentState.resolvedArtikele === props.artikele
          ? props.resolvedStateClass
          : ""
      }`}
      onClick={() => handleArtikeleClick(props.artikele)}
    >
      <span className="artikele-option-label">{props.artikele}</span>
    </div>
  );
}
