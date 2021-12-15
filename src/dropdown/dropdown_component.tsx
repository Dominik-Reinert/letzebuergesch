/**@jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import { useStyleContext } from "../style_context/use_style_context";
import { dropdownComponentStyle } from "./dropdown_component_style";

export interface DropdownItem {
  id: string;
  label: string;
  selected: boolean;
  onClick: (id: string) => void;
}
export interface DropdownComponentProps {
  label: string;
  items: Omit<DropdownItem, "onClick">[];
  onSelect: (id: string) => void;
}

export function DropdownComponent(props: DropdownComponentProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const onToggleOpen = React.useCallback(() => setOpen(!open), [open, setOpen]);
  const onItemClick = React.useCallback((id) => props.onSelect(id), [props]);
  const styleContext = useStyleContext();
  const numberOfSelectedItems: number = React.useMemo(
    () => props.items.filter((item) => item.selected).length,
    [props]
  );

  function renderItem(item: DropdownItem): JSX.Element {
    const { id, label, selected, onClick } = item;
    return (
      <div key={`${id}-${label}`} className="item">
        <input
          type="checkbox"
          name={id}
          checked={selected}
          onChange={() => onClick(id)}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }

  return (
    <div css={dropdownComponentStyle(styleContext, numberOfSelectedItems)}>
      <div className="header" onClick={onToggleOpen}>
        {numberOfSelectedItems > 0 && (
          <div className="number-selected">{numberOfSelectedItems}</div>
        )}
        <div className="label">{props.label}</div>
        <span className={open ? "fas fa-angle-up" : "fas fa-angle-down"} />
      </div>
      {open && (
        <div className="items">
          {props.items.map((item) => {
            return renderItem({ ...item, onClick: onItemClick });
          })}
        </div>
      )}
    </div>
  );
}
