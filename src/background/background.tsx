/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { useStyleContext } from "../style_context/use_style_context";

export function Background(props: React.PropsWithChildren<{}>): JSX.Element {
  const styleContext = useStyleContext();
  const style = css`
    label: background;
    height: 100%;
    background-color: white;
    
    //desktop
    @media only screen and (min-width: 768px) {
      background-color: ${styleContext.colors.cardBackground};
    }
  `;
  return <div css={style}>{props.children}</div>;
}
