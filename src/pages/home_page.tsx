/**@jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { proxy, useSnapshot } from "valtio";
import { useLanguageTranslation } from "../i18n";
import { useUpdateOnStoreChange } from "../store/use_update_on_store_change";
import { Sex, wordStore } from "../store/word_store";
import { useStyleContext } from "../style_context/use_style_context";
import { homePageStyle, homePageSuspendingStyle } from "./home_page_style";

export function HomePage(): JSX.Element {
  return (
    <React.Suspense fallback={<HomePageFallback />}>
      <HomePageSuspending />
    </React.Suspense>
  );
}

function HomePageFallback(): JSX.Element {
  const [t] = useLanguageTranslation();
  const styleContext = useStyleContext();
  return (
    <div css={homePageStyle(styleContext)}>
      <span className="welcome">{t("welcome")}</span>
      <span className="instruction">{t("homeInstruction")}</span>
    </div>
  );
}

const nAllowedRule = ["h", "a", "t", "z", "i", "y", "e", "n", "d", "u", "o"];

enum Article {
  DE = "DE",
  DEN = "DEN",
  D = "D",
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
} = proxy({
  index: 0,
  showTranslation: false,
  resolvedState: ResolvedState.OPEN,
});

const HomePageSuspending = () => {
  const styleContext = useStyleContext();
  const [t] = useLanguageTranslation();
  useUpdateOnStoreChange(wordStore);

  const words = wordStore.getCurrentDataAdapted().words;
  const componentState = useSnapshot(currentState);
  const currentWord = words[componentState.index];

  function transitionToOpen(): void {
    currentState.resolvedState = ResolvedState.OPEN;
    currentState.showTranslation = false;
    currentState.index++;
  }

  function transitionToIncorrect(): void {
    currentState.resolvedState = ResolvedState.INCORRECT;
  }

  function transitionToCorrect(): void {
    currentState.resolvedState = ResolvedState.CORRECT;
  }

  function showTranslation(): void {
    currentState.showTranslation = true;
  }

  function handleArticleClick(article: Article): void {
    switch (article) {
      case Article.D:
        currentWord.sex === Sex.WEIBLECH
          ? transitionToCorrect()
          : transitionToIncorrect();
        break;
      case Article.DE:
        currentWord.sex !== Sex.WEIBLECH &&
        !nAllowedRule.includes(currentWord.singular[0])
          ? transitionToCorrect()
          : transitionToIncorrect();
        break;
      case Article.DEN:
        currentWord.sex !== Sex.WEIBLECH &&
        nAllowedRule.includes(currentWord.singular[0])
          ? transitionToCorrect()
          : transitionToIncorrect();
    }
  }

  const resolvedStateClass =
    componentState.resolvedState === ResolvedState.CORRECT
      ? "correct"
      : componentState.resolvedState === ResolvedState.INCORRECT
      ? "incorrect"
      : "";
  return (
    <div
      css={homePageSuspendingStyle(styleContext)}
      onClick={() =>
        componentState.resolvedState !== ResolvedState.OPEN &&
        transitionToOpen()
      }
    >
      <div className={`word-card ${resolvedStateClass}`}>
        <div onClick={() => showTranslation()}>question mark</div>
        <div>{currentWord?.singular}</div>
        <div>{componentState.showTranslation && "übersetzung"}</div>
      </div>
      <div>
        <span
          className={`article-option ${
            currentWord?.sex === Sex.WEIBLECH ? resolvedStateClass : ""
          }`}
          onClick={() => handleArticleClick(Article.D)}
        >
          d'
        </span>
        <span
          className={`article-option ${
            currentWord?.sex === Sex.MAENNLECH &&
            !nAllowedRule.includes(currentWord?.singular[0])
              ? resolvedStateClass
              : ""
          }`}
          onClick={() => handleArticleClick(Article.DE)}
        >
          de
        </span>
        <span
          className={`article-option ${
            currentWord?.sex === Sex.MAENNLECH &&
            nAllowedRule.includes(currentWord?.singular[0])
              ? resolvedStateClass
              : ""
          }`}
          onClick={() => handleArticleClick(Article.DEN)}
        >
          den
        </span>
      </div>
    </div>
  );
};
