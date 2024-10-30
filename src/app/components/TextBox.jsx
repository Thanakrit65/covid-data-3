import React from 'react';

const TextBox = ({ value, onChange }) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        rows={4}
        cols={50}
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
      />
    </div>
  );
};

export default TextBox;
