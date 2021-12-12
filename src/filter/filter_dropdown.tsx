/**@jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import { proxy, useSnapshot } from "valtio";
import {
  DropdownComponent,
  DropdownItem,
} from "../dropdown/dropdown_component";
import { useUpdateOnStoreChange } from "../store/use_update_on_store_change";
import { wordStore } from "../store/word_store";

interface BookAndChapter {
  id: string;
  book: string;
  selected: boolean;
  chapter?: string;
}

const filterState: {
  booksAndChapers:BookAndChapter [];
} = proxy({
  booksAndChapers: [{ id: "test", book: "A1", chapter: "This is chapter 1", selected: false }],
});

export function FilterDropdown(): JSX.Element {
  useUpdateOnStoreChange(wordStore);
  const updateFiltersOnStoreUpdate = React.useCallback(() => {}, []);
  React.useEffect(() => {
    wordStore.registerOnUpdateCallback(updateFiltersOnStoreUpdate);
    return () => wordStore.removeOnUpdateCallback(updateFiltersOnStoreUpdate);
  }, []);
  const componentState = useSnapshot(filterState);

  return (
    <DropdownComponent
      items={componentState.booksAndChapers.map((bookOrChapter) => ({
        id: bookOrChapter.id,
        label: bookOrChapter.chapter ?? bookOrChapter.book,
        selected: bookOrChapter.selected,
      }))}
      label="Bicher a Lektiounen"
      onSelect={(id) => {
        const bookAndChapter = filterState.booksAndChapers.find(
          (bookOrChapter) => bookOrChapter.id === id
        ) as BookAndChapter;
        bookAndChapter.selected = !bookAndChapter.selected;
      }}
    />
  );
}
