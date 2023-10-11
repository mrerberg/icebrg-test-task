import { useCallback, useState } from "react";

import { Input, InputProps } from "antd";
import { debounce } from "debounce";

import { useSearch } from "./hooks/use-search";
import { SuggestList } from "./suggest-list";

import styles from "./index.module.css";

export const AutoComplete = () => {
  const [value, setValue] = useState("");
  const search = useSearch({});

  const debouncedSearch = useCallback(
    debounce((query: string) => search.mutate({ query }), 500),
    []
  );

  const handleChange: InputProps["onChange"] = (evt) => {
    const { value } = evt.target;
    setValue(value);
    debouncedSearch(value);
  };

  return (
    <div className={styles.wrapper}>
      <Input
        className={styles.input}
        placeholder="Search..."
        type="text"
        size="large"
        value={value}
        onChange={handleChange}
      />

      <SuggestList loading={search.isLoading} data={search.data} />
    </div>
  );
};
