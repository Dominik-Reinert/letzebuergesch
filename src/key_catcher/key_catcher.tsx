import * as React from "react";
import { useKey } from "rooks";

interface KeyCatcherProps {}

export function KeyCatcher(
  props: React.PropsWithChildren<KeyCatcherProps>
): JSX.Element {
  useKey; // Catch left/right input
  return <div> {props.children}</div>;
}
