/**@jsx jsx */
import { jsx } from "@emotion/react";
import { useLocation } from "react-router";
import { FilterDropdown } from "../filter/filter_dropdown";
import { Routes } from "../routes/routes";
import { useStyleContext } from "../style_context/use_style_context";
import { navbarStyle } from "./navbar_style";

export function Navbar(): JSX.Element {
  const styleContext = useStyleContext();
  const location = useLocation();

  function shouldRenderFilterDropdown(): boolean {
    return location.pathname.includes(Routes.ARTIKELE_MATCHEN);
  }

  return (
    <div css={navbarStyle(styleContext)}>
      <div className="page-name-wrapper">
        <span className="page-name">Lëtzebuergesch</span>
        {shouldRenderFilterDropdown() && <FilterDropdown />}
      </div>
    </div>
  );
}
