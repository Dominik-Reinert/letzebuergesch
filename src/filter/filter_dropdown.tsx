/**@jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import { proxy, useSnapshot } from "valtio";
import { DropdownComponent } from "../dropdown/dropdown_component";
import { useUpdateOnStoreChange } from "../store/use_update_on_store_change";
import { wordStore } from "../store/word_store";

interface BookAndChapter {
  id: string;
  book: string;
  selected: boolean;
  chapter?: string;
}

const filterState: {
  booksAndChapters: BookAndChapter[];
} = proxy({
  booksAndChapters: [],
});

export function FilterDropdown(): JSX.Element {
  useUpdateOnStoreChange(wordStore);
  const updateFiltersOnStoreUpdate = React.useCallback(() => {
    filterState.booksAndChapters = wordStore
      .getCurrentDataAdapted()
      .words.map(({ book, chapter }) => ({
        id: `${book}-${chapter}`,
        book,
        chapter,
        selected: true,
      }))
      .filter(
        (bookAndChapter, index, arr) =>
          arr.findIndex((e) => e.id === bookAndChapter.id) === index
      );
  }, []);
  React.useEffect(() => {
    wordStore
      .getCurrentData()
      .spreadSheetCellRoot?.registerOnUpdateCallback(
        updateFiltersOnStoreUpdate
      );
    return () =>
      wordStore
        .getCurrentData()
        .spreadSheetCellRoot?.removeOnUpdateCallback(
          updateFiltersOnStoreUpdate
        );
  }, [
    wordStore.getCurrentData().spreadSheetCellRoot,
    updateFiltersOnStoreUpdate,
  ]);
  const componentState = useSnapshot(filterState);

  return (
    <DropdownComponent
      items={componentState.booksAndChapters.map((bookOrChapter) => ({
        id: bookOrChapter.id,
        label: `${bookOrChapter.book} ${bookOrChapter.chapter}`,
        selected: bookOrChapter.selected,
      }))}
      label="Bicher a Lektiounen"
      onSelect={(id) => {
        const bookAndChapter = filterState.booksAndChapters.find(
          (bookOrChapter) => bookOrChapter.id === id
        ) as BookAndChapter;
        bookAndChapter.selected = !bookAndChapter.selected;
      }}
    />
  );
}
