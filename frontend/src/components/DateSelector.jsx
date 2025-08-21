import React from "react";

function DateSelector({ selectedDate, setSelectedDate }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label>
        Select Date:{" "}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>
    </div>
  );
}

export default DateSelector;

