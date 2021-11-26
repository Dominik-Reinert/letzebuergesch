/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { useStyleContext } from "../style_context/use_style_context";

export function Background(props: React.PropsWithChildren<{}>): JSX.Element {
  const styleContext = useStyleContext();
  const style = css`
    label: background;
    background-color: ${styleContext.colors.cardBackground};
    height: 100%;
  `;
  return <div css={style}>{props.children}</div>;
}
