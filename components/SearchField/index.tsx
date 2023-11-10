'use client';

import { ChangeEvent, CompositionEvent, KeyboardEventHandler, useCallback, useState } from 'react';
import styles from './index.module.css';

export default function SearchField() {
  const [composing, setComposition] = useState(false);
  const [query, setQuery] = useState('');

  //dealign with user input set to state
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  //keyboard event handler link to queried page
  const _onEnter: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.code === 'Enter' && !composing) {
        location.href = `/search?q=${query}`;
      }
    },
    [query, composing],
  );

  //IMEcomposition start handler
  const startComposition = () => setComposition(true);
  //IMEcomposition end hander
  const endComposition = () => setComposition(false);

  return (
    <input
      type="search"
      name="q"
      value={query}
      className={styles.search}
      placeholder="Search..."
      onKeyDown={_onEnter}
      onChange={handleChange}
      onCompositionStart={startComposition}
      onCompositionEnd={endComposition}
    />
  );
}
