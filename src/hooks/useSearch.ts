import { useState, useMemo, useCallback } from 'react';

export function useSearch<T>(
  items: T[],
  searchFields: (item: T) => string[]
) {
  const [query, setQuery] = useState('');

  const searchFieldsMemo = useCallback(searchFields, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase().trim();
    return items.filter(item =>
      searchFieldsMemo(item).some(field =>
        field.toLowerCase().includes(lower)
      )
    );
  }, [items, query, searchFieldsMemo]);

  return { query, setQuery, filtered };
}
