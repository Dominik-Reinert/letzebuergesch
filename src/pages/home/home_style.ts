import { css } from "@emotion/react";
import { SerializedStyles } from "@emotion/utils";
import { StyleContext } from "../../style_context/style_context";

export function homeStyle(styleContext: StyleContext): SerializedStyles {
  return css`
    label: home-page;

    display: flex;
    flex-direction: column;
    margin: 20px auto;

    width: 60%;

    .list-element {
      width: 100%;
      border-radius: ${styleContext.sizes.borderRadius.selection};
      height: ${styleContext.sizes.height.selection};
      background-color: ${styleContext.shades.separation};
      cursor: pointer;
      text-align: center;
    }

    .list-element-label {
      margin: auto;
      color: ${styleContext.colors.cardBackground};
      vertical-align: middle;
      font-size: ${styleContext.sizes.font.text};
    }
  `;
}
