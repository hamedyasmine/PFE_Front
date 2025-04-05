import React from "react";

function JobTypeItem({ label, checked, onChange }) {
  return (
    <label className="container">
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark" />
    </label>
  );
}

export default JobTypeItem;
