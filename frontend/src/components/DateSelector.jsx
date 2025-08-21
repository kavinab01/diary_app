import React from 'react';

export default function DateSelector({ date, setDate }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label>
        Select date:{" "}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
    </div>
  );
}
