import { useLanguageTranslation } from "../../i18n";
import { useStyleContext } from "../../style_context/use_style_context";
/**@jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { articleMatchenPageStyle } from "./article_matchen_page_style";

export function ArticleMatchenPageFallback(): JSX.Element {
    const [t] = useLanguageTranslation();
    const styleContext = useStyleContext();
    return (
      <div css={articleMatchenPageStyle(styleContext)}>
        <span className="welcome">{t("welcome")}</span>
        <span className="instruction">{t("articleMatchenInstruction")}</span>
      </div>
    );
  }