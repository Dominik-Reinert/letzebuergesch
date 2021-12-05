import React from "react";
import { useLanguageTranslation } from "../../i18n";
import { useStyleContext } from "../../style_context/use_style_context";
import { artikeleMatchenPageStyle } from "./artikele_matchen_page_style";

export function ArtikeleMatchenPageFallback(): JSX.Element {
  const [t] = useLanguageTranslation();
  const styleContext = useStyleContext();
  return (
    <div css={artikeleMatchenPageStyle(styleContext)}>
      <span className="welcome">{t("welcome")}</span>
      <span className="instruction">{t("artikeleMatchenInstruction")}</span>
    </div>
  );
}
