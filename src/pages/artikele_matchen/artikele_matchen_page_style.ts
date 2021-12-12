import { css, SerializedStyles } from "@emotion/react";
import { StyleContext } from "../../style_context/style_context";

export function artikeleMatchenPageStyle(
  styleContext: StyleContext
): SerializedStyles {
  return css`
    label: ArtikeleMatchen-page;

    display: flex;

    margin: 80px auto;
    flex-direction: column;
    width: 70%;
    text-align: center;

    .welcome {
      font-size: ${styleContext.sizes.font.welcome};
      color: ${styleContext.shades.text};
    }

    .instruction {
      font-size: ${styleContext.sizes.font.headline};
      color: ${styleContext.shades.text};
    }
  `;
}

export function artikeleMatchenPageSuspendingStyle(
  styleContext: StyleContext
): SerializedStyles {
  return css`
    label: ArtikeleMatchen-page;
    height: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .header {
      display: flex;
      width: 70%;
      margin: auto;
      align-content: center;
      justify-content: space-around;
      padding: 16px;
      text-align: left;

      > * {
        flex: 1 0 0;
        color: ${styleContext.shades.text};
        font-size: ${styleContext.sizes.font.smallText};
        text-align: center;
      }

      .name {
        text-align: left;
      }
    }

    .scrollable-content {
      overflow-y: auto;
      height: calc(100% - 60px);
    }

    .correct {
      background-color: green !important;
    }

    .incorrect {
      background-color: red !important;
    }

    .width-wrapper {
      width: 40%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .word-card {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      background-color: white;
      height: 80%;
      border-radius: 4px;
      padding: 8px;
    }

    .help {
      flex: 4 0 0;
      font-size: ${styleContext.sizes.font.smallText};
      align-self: flex-end;
      display: flex;
      width: 100%;
      justify-content: space-between;

      span {
        width: 10px;
        height: 10px;
        cursor: pointer;
      }
    }

    .word {
      display: flex;
      flex: 12 0 0;
      font-size: ${styleContext.sizes.font.text};
      align-self: center;

      span {
        display: flex;
        margin: auto;
      }
    }

    .translation {
      flex: 6 0 0;
      font-size: ${styleContext.sizes.font.smallText};
      align-self: center;

      span {
        margin: auto;
      }
    }

    .artikelen {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
    }

    .artikele-option {
      flex: 12 0 0;
      border-radius: ${styleContext.sizes.borderRadius.selection};
      height: ${styleContext.sizes.height.selection};
      background-color: ${styleContext.shades.separation};
      cursor: pointer;
      text-align: center;
      margin-top: 16px;
    }

    .artikele-option-label {
      margin: auto;
      color: ${styleContext.colors.cardBackground};
      vertical-align: middle;
      font-size: ${styleContext.sizes.font.text};
    }

    //desktop
    @media only screen and (min-width: 768px) {
      .artikelen {
        flex-direction: row;
      }

      .artikele-option {
        margin: 0 8px 0 8px;
      }

      .word-card {
        box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 40%);
      }

      .help {
        font-size: ${styleContext.sizes.font.text};
      }

      .word {
        font-size: ${styleContext.sizes.font.subHeadline};
      }

      .translation {
        font-size: ${styleContext.sizes.font.text};
      }
    }
  `;
}