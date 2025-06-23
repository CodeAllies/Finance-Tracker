import React, { useEffect, useState ,useRef} from 'react';
import { useParams, useLocation} from 'react-router-dom';

const CategoryView = () => {
  const { year, month, category } = useParams();
  const location = useLocation();

  const [entries, setEntries] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // 🆕 Add entry from navigation state (if available)

const hasHandledState = useRef(false);

useEffect(() => {
  if (hasHandledState.current) return;

  const incoming = location.state?.entry;
  if (incoming) {
    const exists = entries.some(
      (e) =>
        e.amount === incoming.amount &&
        e.description === incoming.description &&
        e.date === incoming.date
    );

    if (!exists) {
      setEntries((prev) => [...prev, incoming]);
    }
  }

  hasHandledState.current = true;
}, [location.state]);

  const addEntry = () => {
    if (!amount.trim()) return;

    const newEntry = {
      amount: parseFloat(amount),
      description: description.trim(),
      date: new Date().toLocaleDateString()
    };

    setEntries([...entries, newEntry]);
    setAmount('');
    setDescription('');
    setShowForm(false);
  };

  const deleteEntry = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditAmount(entries[index].amount.toString());
    setEditDescription(entries[index].description || '');
  };

  const saveEdit = () => {
    if (!editAmount.trim()) return;

    const updated = [...entries];
    updated[editingIndex] = {
      ...updated[editingIndex],
      amount: parseFloat(editAmount),
      description: editDescription.trim()
    };

    setEntries(updated);
    setEditingIndex(null);
    setEditAmount('');
    setEditDescription('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditAmount('');
    setEditDescription('');
  };

  return (
    <div className="container py-4">
      <h2 className="text-primary">{category} - {month} {year}</h2>

      <button className="btn btn-success mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ {showForm ? 'Cancel' : 'Add Entry'}
      </button>

      {showForm && (
        <div className="card p-3 mb-4" style={{ maxWidth: '500px' }}>
          <div className="mb-2">
            <label className="form-label">Amount *</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Description (optional)</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Big Bazaar"
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={addEntry}>
            ✅ Add Entry
          </button>
        </div>
      )}

      {entries.length > 0 && (
        <div>
          <h5 className="text-secondary">📋 Entries:</h5>
          <ul className="list-group">
            {entries.map((entry, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-start" key={index}>
                {editingIndex === index ? (
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      className="form-control mb-1"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control mb-1"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <button className="btn btn-sm btn-primary me-2" onClick={saveEdit}>💾 Save</button>
                    <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>❌ Cancel</button>
                  </div>
                ) : (
                  <>
                    <div>
                      <strong>₹{entry.amount.toFixed(2)}</strong>{' '}
                      {entry.description && <span>– {entry.description}</span>}
                      <br />
                      <small className="text-muted">{entry.date}</small>
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => startEditing(index)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteEntry(index)}
                      >
                        🗑
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryView;
