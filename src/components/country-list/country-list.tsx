import { memo, useMemo } from 'react';
import { List, type RowComponentProps } from 'react-window';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

type RowProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

const ITEM_HEIGHT = 300;

const Row = ({ index, style, countries, selectedYear, selectedColumns }: RowComponentProps<RowProps>) => (
  <div style={style} className={styles.row}>
    <CountryCard
      country={countries[index]}
      selectedYear={selectedYear}
      selectedColumns={selectedColumns}
    />
  </div>
);

export const CountryList = memo(({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(
    () =>
      countries
        .filter((c) => {
          const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
          return matchesSearch && matchesRegion;
        })
        .sort((a, b) => {
          if (sortField === 'name') {
            return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
          } else {
            const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
            const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
            return sortOrder === 'asc' ? popA - popB : popB - popA;
          }
        }),
    [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]
  );

  return (
    <List
      rowCount={filteredCountries.length}
      rowHeight={ITEM_HEIGHT}
      rowComponent={Row}
      rowProps={{ countries: filteredCountries, selectedYear, selectedColumns }}
      className={styles.countryList}
    />
  );
});

CountryList.displayName = 'CountryList';
