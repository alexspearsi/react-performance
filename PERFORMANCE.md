# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 2.1 s
- **Render duration**: 290 ms
- **Screenshot**: ![baseline-sort](screenshots/baseline/sort.jpg)

### Interaction B: Search countries

- **Commit duration**: 2.1 s
- **Render duration**: 162 ms
- **Screenshot**: ![baseline-search](screenshots/baseline/search.jpg)

### Interaction C: Change year

- **Commit duration**: 6.4 s
- **Render duration**: 307 ms
- **Screenshot**: ![baseline-year](screenshots/baseline/year.jpg)

### Interaction D: Toggle column

- **Commit duration**: 4.4 s
- **Render duration**: 150 ms
- **Screenshot**: ![baseline-column](screenshots/baseline/column.jpg)

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: ___ ms
- **Render duration**: ___ ms
- **Screenshot**: ![optimized-sort](screenshots/optimized/sort.png)

### Interaction B: Search countries

- **Commit duration**: ___ ms
- **Render duration**: ___ ms
- **Screenshot**: ![optimized-search](screenshots/optimized/search.png)

### Interaction C: Change year

- **Commit duration**: ___ ms
- **Render duration**: ___ ms
- **Screenshot**: ![optimized-year](screenshots/optimized/year.png)

### Interaction D: Toggle column

- **Commit duration**: ___ ms
- **Render duration**: ___ ms
- **Screenshot**: ![optimized-column](screenshots/optimized/column.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 290           | ___            | ___%        |
| Search countries | 162           | ___            | ___%        |
| Change year      | 307           | ___            | ___%        |
| Toggle column    | 150           | ___            | ___%        |
| **Average**      | **227**       | **___**        | **___%**    |

## Applied Optimizations

- `useMemo` for `years`, `availableColumns`, `filteredCountries`, `yearDataMap`, `yearData`
- `useCallback` for all event handlers in `App`
- `React.memo` on `CountryCard`, `DataTable`, `SearchBar`, `YearSelector`, `ColumnModal`
- Proper `key` props: `key={country.id}` in lists, `key={column}` in table rows
- Virtualization with `react-window` `FixedSizeList` for the country list
