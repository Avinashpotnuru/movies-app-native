const sortOptions = [
  { label: "Original Title (A-Z)", value: "original_title.asc" },
  { label: "Original Title (Z-A)", value: "original_title.desc" },

  { label: "Popularity (Low → High)", value: "popularity.asc" },
  { label: "Popularity (High → Low)", value: "popularity.desc" },

  { label: "Revenue (Low → High)", value: "revenue.asc" },
  { label: "Revenue (High → Low)", value: "revenue.desc" },

  { label: "Release Date (Oldest First)", value: "primary_release_date.asc" },
  {
    label: "Release Date (Newest First)",
    value: "primary_release_date.desc",
  },

  { label: "Title (A-Z)", value: "title.asc" },
  { label: "Title (Z-A)", value: "title.desc" },

  { label: "Vote Average (Low → High)", value: "vote_average.asc" },
  { label: "Vote Average (High → Low)", value: "vote_average.desc" },

  { label: "Vote Count (Low → High)", value: "vote_count.asc" },
  { label: "Vote Count (High → Low)", value: "vote_count.desc" },
];

export { sortOptions };