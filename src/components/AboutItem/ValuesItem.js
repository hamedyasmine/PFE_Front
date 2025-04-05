import React from 'react';

function ValueItem({ title, description }) {
  return (
    <li>
      <strong style={{ color: '#003366' }}>{title}:</strong> {description}
    </li>
  );
}

export default ValueItem;
