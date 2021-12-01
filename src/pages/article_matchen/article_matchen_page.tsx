/**@jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { proxy, useSnapshot } from "valtio";
import { useUpdateOnStoreChange } from "../../store/use_update_on_store_change";
import { Sex, wordStore } from "../../store/word_store";
import { useStyleContext } from "../../style_context/use_style_context";
import { ArticleMatchenPageFallback } from "./article_matchen_fallback";
import { articleMatchenPageSuspendingStyle } from "./article_matchen_page_style";

export function ArticleMatchenPage(): JSX.Element {
  return (
    <React.Suspense fallback={<ArticleMatchenPageFallback />}>
      <ArticleMatchenPageSuspending />
    </React.Suspense>
  );
}

const nAllowedRule = ["h", "a", "t", "z", "i", "y", "e", "n", "d", "u", "o"];

enum Article {
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
  resolvedArticle?: Article;
} = proxy({
  index: 0,
  showTranslation: false,
  resolvedState: ResolvedState.OPEN,
});

const ArticleMatchenPageSuspending = () => {
  const styleContext = useStyleContext();
  useUpdateOnStoreChange(wordStore);

  const words = wordStore.getCurrentDataAdapted().words;
  const componentState = useSnapshot(currentState);
  const currentWord = words[componentState.index];

  function transitionToOpen(): void {
    currentState.resolvedState = ResolvedState.OPEN;
    currentState.resolvedArticle = undefined;
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
      css={articleMatchenPageSuspendingStyle(styleContext)}
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
        <div className="articles">
          {[Article.D, Article.DE, Article.DEN].map((article) => {
            return (
              <ArticleOption
                key={`${article}-option`}
                article={article}
                resolvedStateClass={resolvedStateClass}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

function ArticleOption(props: {
  article: Article;
  resolvedStateClass: string;
}): JSX.Element {
  const componentState = useSnapshot(currentState);
  const words = wordStore.getCurrentDataAdapted().words;
  const currentWord = words[componentState.index];

  function transitionToIncorrect(article: Article): void {
    currentState.resolvedState = ResolvedState.INCORRECT;
    currentState.resolvedArticle = article;
  }

  function transitionToCorrect(article: Article): void {
    currentState.resolvedState = ResolvedState.CORRECT;
    currentState.resolvedArticle = article;
  }

  function handleArticleClick(article: Article): void {
    switch (article) {
      case Article.D:
        [Sex.WEIBLECH, Sex.SAECHLECH].includes(currentWord.sex)
          ? transitionToCorrect(article)
          : transitionToIncorrect(article);
        break;
      case Article.DE:
        currentWord.sex === Sex.MAENNLECH &&
        !nAllowedRule.includes(currentWord.singular[0].toLocaleLowerCase())
          ? transitionToCorrect(article)
          : transitionToIncorrect(article);
        break;
      case Article.DEN:
        currentWord.sex === Sex.MAENNLECH &&
        nAllowedRule.includes(currentWord.singular[0].toLocaleLowerCase())
          ? transitionToCorrect(article)
          : transitionToIncorrect(article);
    }
  }

  return (
    <div
      className={`article-option ${
        componentState.resolvedArticle === props.article
          ? props.resolvedStateClass
          : ""
      }`}
      onClick={() => handleArticleClick(props.article)}
    >
     <span className="article-option-label">{props.article}</span>
    </div>
  );
}
