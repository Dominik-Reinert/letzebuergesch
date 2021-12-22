/**@jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { proxy, useSnapshot } from "valtio";
import {
  filterIdBookAndChapterSeparator,
  filterState
} from "../../filter/filter_dropdown";
import { useUpdateOnStoreChange } from "../../store/use_update_on_store_change";
import { Sex, Word, wordStore } from "../../store/word_store";
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
  D = "D'"
}

enum ResolvedState {
  OPEN = "OPEN",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT"
}
const currentState: {
  showTranslation: boolean;
  resolvedState: ResolvedState;
  currentWord?: Word;
  resolvedArtikele?: Artikele;
  filteredWords: () => Word[];
} = proxy({
  filteredWords: () =>
    wordStore.getCurrentDataAdapted().words.filter((word) =>
      filterState.booksAndChapters
        .filter((bookAndChapter) => bookAndChapter.selected)
        .map((bookAndChapter) => {
          const [book, chapter] = bookAndChapter.id.split(
            filterIdBookAndChapterSeparator
          );
          return {
            book,
            chapter
          };
        })
        .find(
          ({ book, chapter }) => book === word.book && chapter === word.chapter
        )
    ),
  showTranslation: false,
  resolvedState: ResolvedState.OPEN
});

/**
 * Randomize array in-place using Durstenfeld shuffle algorithm
 *
 * Credits to https://stackoverflow.com/a/12646864/3643533
 */
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ArtikeleMatchenPageSuspending = () => {
  const styleContext = useStyleContext();
  useUpdateOnStoreChange(wordStore);

  useSnapshot(filterState);
  const componentState = useSnapshot(currentState);

  function getRandomWord(): Word {
    return shuffleArray(componentState.filteredWords().slice(0))[0];
  }

  if (componentState.currentWord === undefined) {
    currentState.currentWord = getRandomWord();
  }

  function transitionToOpen(): void {
    currentState.resolvedState = ResolvedState.OPEN;
    currentState.resolvedArtikele = undefined;
    currentState.showTranslation = false;
    currentState.currentWord = getRandomWord();
  }

  function showTranslation(): void {
    currentState.showTranslation = true;
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
            <span
              className="fas fa-question-circle"
              onClick={() => showTranslation()}
            />
          </div>
          <div className="word">
            <span>{componentState.currentWord?.singular}</span>
          </div>
          <div className="translation">
            <span>
              {componentState.showTranslation &&
                `(${componentState.currentWord?.translation})`}
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
        [Sex.WEIBLECH, Sex.SAECHLECH].includes(
          componentState.currentWord?.sex as Sex
        )
          ? transitionToCorrect(artikele)
          : transitionToIncorrect(artikele);
        break;
      case Artikele.DE:
        componentState.currentWord?.sex === Sex.MAENNLECH &&
        !nAllowedRule.includes(
          componentState.currentWord.singular[0].toLocaleLowerCase()
        )
          ? transitionToCorrect(artikele)
          : transitionToIncorrect(artikele);
        break;
      case Artikele.DEN:
        componentState.currentWord?.sex === Sex.MAENNLECH &&
        nAllowedRule.includes(
          componentState.currentWord.singular[0].toLocaleLowerCase()
        )
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
