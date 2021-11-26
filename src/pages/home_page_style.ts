import { css, SerializedStyles } from "@emotion/react";
import { StyleContext } from "../style_context/style_context";

export function homePageStyle(styleContext: StyleContext): SerializedStyles {
  return css`
    label: home-page;

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

export function homePageSuspendingStyle(
  styleContext: StyleContext
): SerializedStyles {
  return css`
    label: home-page;
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
        font-size: ${styleContext.sizes.font.text};
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

    .articles {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .word-card {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 40%);
      background-color: white;
      height: 80%;
      border-radius: 4px;
      padding: 8px;
    }

    .article-option {
      width: 10%;
      background-color: white;
      border-radius: 4px;
      box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 40%);
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
    }

    .help {
      flex: 4 0 0;
      font-size: ${styleContext.sizes.font.text};
      align-self: flex-end;

      span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 40%);
        cursor: pointer;
      }
    }

    .word {
      display: flex;
      flex: 12 0 0;
      font-size: ${styleContext.sizes.font.headline};
      align-self: center;

      span {
        display: flex;
        margin: auto;
      }
    }

    .translation {
      flex: 6 0 0;
      font-size: ${styleContext.sizes.font.subHeadline};
      align-self: center;

      span {
        margin: auto;
      }
    }
  `;
}
