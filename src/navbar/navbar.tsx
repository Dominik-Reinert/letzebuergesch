/**@jsx jsx */
import { jsx } from "@emotion/react";
import { FilterDropdown } from "../filter/filter_dropdown";
import { useStyleContext } from "../style_context/use_style_context";
import { navbarStyle } from "./navbar_style";

export function Navbar(): JSX.Element {
  const styleContext = useStyleContext();

  return (
    <div css={navbarStyle(styleContext)}>
      <div className="page-name-wrapper">
        <span className="page-name">Lëtzebuergesch</span>
        <FilterDropdown />
      </div>
    </div>
  );
}
