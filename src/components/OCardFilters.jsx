import React from "react";

const OCardFilters = ({ filters, setFilters, allTips }) => {
  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Count values
  const countMap = (key) => {
    const counts = {};
    allTips.forEach(tip => {
      const value = tip[key] || "Unknown";
      counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  };

  const categories = countMap("category");
  const urgencies = countMap("urgency");
  const bookmakers = countMap("bookmaker");

  return (
    <div className="flex flex-wrap gap-4 bg-[#0A0E2C] p-3 rounded-lg mb-4 text-sm">
      {/* Category */}
      <select
        className="px-2 py-1 rounded bg-[#1C1F3C] text-white"
        onChange={e => handleChange("category", e.target.value)}
        value={filters.category}
      >
        <option value="">All Categories ({Object.values(categories).reduce((a, b) => a + b, 0)})</option>
        {Object.entries(categories).map(([cat, count]) => (
          <option key={cat} value={cat}>{cat} ({count})</option>
        ))}
      </select>

      {/* Urgency */}
      <select
        className="px-2 py-1 rounded bg-[#1C1F3C] text-white"
        onChange={e => handleChange("urgency", e.target.value)}
        value={filters.urgency}
      >
        <option value="">All Urgencies ({Object.values(urgencies).reduce((a, b) => a + b, 0)})</option>
        {Object.entries(urgencies).map(([urg, count]) => (
          <option key={urg} value={urg}>{urg} ({count})</option>
        ))}
      </select>

      {/* Bookmaker */}
      <select
        className="px-2 py-1 rounded bg-[#1C1F3C] text-white"
        onChange={e => handleChange("bookmaker", e.target.value)}
        value={filters.bookmaker}
      >
        <option value="">All Bookmakers ({Object.values(bookmakers).reduce((a, b) => a + b, 0)})</option>
        {Object.entries(bookmakers).map(([book, count]) => (
          <option key={book} value={book}>{book} ({count})</option>
        ))}
      </select>

      {/* Min Odds */}
      <input
        type="number"
        placeholder="Min Odds"
        className="px-2 py-1 rounded bg-[#1C1F3C] text-white w-28"
        value={filters.minOdds}
        onChange={e => handleChange("minOdds", e.target.value)}
      />

      {/* Min Confidence */}
      <input
        type="number"
        placeholder="Min Confidence %"
        className="px-2 py-1 rounded bg-[#1C1F3C] text-white w-32"
        value={filters.minConfidence}
        onChange={e => handleChange("minConfidence", e.target.value)}
      />
    </div>
  );
};

export default OCardFilters;
