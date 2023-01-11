interface StatsInfo {
  count: number;
  sum: number;
}

export interface GeneralStats<T> extends StatsInfo {
  key: T;
}

export interface SpecificStats extends StatsInfo {
  key: {
    year: number;
    month: number;
  };
}
