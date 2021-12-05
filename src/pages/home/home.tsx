/**@jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import { useHistory } from "react-router";
import { Routes } from "../../routes/routes";
import { useStyleContext } from "../../style_context/use_style_context";
import { homeStyle } from "./home_style";

const routeLabelMapping: {
  route: Routes;
  label: string;
}[] = [
  {
    route: Routes.ARTIKELE_MATCHEN,
    label: "Artikele matchen",
  },
];

export function HomePage(): JSX.Element {
  const history = useHistory();
  const styleContext = useStyleContext();
  const onClick = React.useCallback(
    (route: Routes) => {
      history.push(route);
    },
    [history]
  );

  return (
    <div css={homeStyle(styleContext)} className="list">
      {routeLabelMapping.map(({ route, label }) => (
        <div
          key={route}
          className="list-element"
          onClick={() => onClick(route)}
        >
          <span className="list-element-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
