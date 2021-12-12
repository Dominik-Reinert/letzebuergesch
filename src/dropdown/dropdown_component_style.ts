import { css, SerializedStyles } from "@emotion/react";
import { StyleContext } from "../style_context/style_context";

export function dropdownComponentStyle(
  styleContext: StyleContext,
  numberOfSelectedItems: number
): SerializedStyles {
  return css`
    label: dropdown-component;

    .header {
      cursor: pointer;

      display: flex;
      flex-direction: row;
      align-items: center;

      color: ${styleContext.shades.text};
      font-size: ${styleContext.sizes.font.text};

      .label {
        margin: 8px 8px 8px ${numberOfSelectedItems > 0 ? "2px" : "4px"};
      }
    }

    .items {
      position: absolute;
      display: flex;
      flex-direction: column;
      background-color: white;
      box-shadow: 5px 5px 11px -2px ${styleContext.shades.boxShadow};

      border-radius: 4px;
      border-top-left-radius: 0;
      overflow: hidden;
    }

    .item {
      padding: 4px 12px;
      font-size: ${styleContext.sizes.font.smallText};

      &.selected {
        color: ${styleContext.shades.text};
        background-color: ${styleContext.colors.cardBackground};
      }

      &:hover {
        color: ${styleContext.shades.text};
        background-color: ${styleContext.colors.cardBackground};
      }

      input[type="checkbox"] {
        cursor: pointer;
      }

      label {
        margin: 8px 0;
      }
    }
  `;
}
