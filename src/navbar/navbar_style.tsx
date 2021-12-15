import { css } from "@emotion/react";
import { desktopStyle } from "../style_context/desktop_style_mixin";
import { StyleContext } from "../style_context/style_context";

export const navbarStyle = (styleContext: StyleContext) => css`
  label: navbar;

  display: flex;
  background-color: ${styleContext.colors.branding};
  height: 20px;
  padding: 20px;

  .page-name-wrapper {
    display: flex;
    flex: 12 6 200px;

    height: 100%;
    align-items: center;
  }

  .link-wrapper {
    display: flex;
    flex: 1 2 300px;
    font-size: ${styleContext.sizes.font.text};

    height: 100%;
    align-items: center;

    margin-top: 8px;
  }

  .page-name {
    font-size: ${styleContext.sizes.font.text};
    margin: 16px;
    color: ${styleContext.shades.text};
  }

  ${desktopStyle(`
    padding: 20px 30% 20px 20%;
  `)}
`;
