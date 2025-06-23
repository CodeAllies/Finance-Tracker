import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageUpload = ({ onProcessed }) => {
  const [loading, setLoading] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const category = window.prompt('Enter category (e.g. Grocery)');
    if (!category || !category.trim()) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result;

      try {
        const { data: { text } } = await Tesseract.recognize(imageData, 'eng');
        
        const now = new Date();
        const year = now.getFullYear();
        const month = now.toLocaleString('default', { month: 'long' });

        const payload = {
          category: category.trim(),
          year,
          month,
          rawText: text
        };

        console.log('✅ Extracted Data:', payload);
        if (onProcessed) onProcessed(payload); // Send back to parent if needed
      } catch (err) {
        console.error('OCR Failed:', err);
        alert('Could not extract text. Try another image.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-4">
      <label className="form-label">📷 Upload Bill/Receipt Image</label>
      <input type="file" accept="image/*" onChange={handleFileSelect} className="form-control" />
      {loading && <p className="text-muted mt-2">🔍 Scanning image... please wait</p>}
    </div>
  );
};

export default ImageUpload;
