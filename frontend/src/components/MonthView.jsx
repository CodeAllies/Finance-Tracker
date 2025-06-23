import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const MonthView = () => {
  const { year, month } = useParams();
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addCategory = () => {
    const trimmed = input.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setInput('');
    }
  };

  const deleteCategory = (index) => {
    const updated = [...categories];
    updated.splice(index, 1);
    setCategories(updated);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditValue(categories[index]);
  };

  const saveEdit = () => {
    if (!editValue.trim()) return;
    const updated = [...categories];
    updated[editingIndex] = editValue.trim();
    setCategories(updated);
    setEditingIndex(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <div className="container py-4">
      <h2 className="text-primary">📅 {month} {year}</h2>

      <div className="input-group my-4" style={{ maxWidth: '400px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter category (e.g. Grocery)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-success" onClick={addCategory}>
          ➕ Add Category
        </button>
      </div>

      {categories.length > 0 && (
        <div className="row mt-4">
          {categories.map((cat, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card shadow-sm bg-light">
                <div className="card-body d-flex flex-column align-items-center">
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="form-control mb-2"
                      />
                      <div>
                        <button className="btn btn-sm btn-primary me-2" onClick={saveEdit}>
                          💾 Save
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>
                          ❌ Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{cat}</h5>
                      <p className="text-muted">Click below to view</p>
                      <Link
                        to={`/year/${year}/${month}/${cat.toLowerCase()}`}
                        className="btn btn-outline-dark btn-sm mb-2"
                      >
                        Open
                      </Link>
                      <div>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => startEditing(index)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteCategory(index)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonthView;
