/**@jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import { useSnapshot } from "valtio";
import { DropdownComponent } from "../dropdown/dropdown_component";
import { localStorageProxy } from "../localstorage/local_storage_proxy";
import { useUpdateOnStoreChange } from "../store/use_update_on_store_change";
import { wordStore } from "../store/word_store";

interface BookAndChapter {
  id: string;
  book: string;
  selected: boolean;
  chapter?: string;
}

export const filterState: {
  initialized: boolean;
  booksAndChapters: BookAndChapter[];
} = localStorageProxy(
  "filterState",
  {
    initialized: false,
    booksAndChapters: []
  },
  { allowMismatchingKeys: false }
);
export const filterIdBookAndChapterSeparator = "-";

export function FilterDropdown(): JSX.Element {
  useUpdateOnStoreChange(wordStore);
  const updateFiltersOnStoreUpdate = React.useCallback(() => {
    filterState.booksAndChapters = wordStore
      .getCurrentDataAdapted()
      .words.map(({ book, chapter }) => {
        const id = `${book}${filterIdBookAndChapterSeparator}${chapter}`;
        return {
          id,
          book,
          chapter,
          selected:
            filterState.booksAndChapters?.find(
              (bookOrChapter) => bookOrChapter.id === id
            )?.selected ?? false
        };
      })
      .filter(
        (bookAndChapter, index, arr) =>
          arr.findIndex((e) => e.id === bookAndChapter.id) === index
      );
  }, []);
  const spreadSheetCellRoot = wordStore.getCurrentData().spreadSheetCellRoot;
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
  }, [spreadSheetCellRoot, updateFiltersOnStoreUpdate]);
  const componentState = useSnapshot(filterState);
  React.useEffect(() => {
    if (!componentState.initialized) {
      updateFiltersOnStoreUpdate();
      filterState.initialized = true;
    }
  }, [updateFiltersOnStoreUpdate, componentState.initialized]);

  return (
    <DropdownComponent
      items={componentState.booksAndChapters.map((bookOrChapter) => ({
        id: bookOrChapter.id,
        label: `${bookOrChapter.book} ${bookOrChapter.chapter}`,
        selected: bookOrChapter.selected
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
