import React, { useState } from 'react';
import '../styles/style.css';
import { Link, useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';

const Home = () => {
  const [years, setYears] = useState([]);
  const [inputYear, setInputYear] = useState('');
  const [error, setError] = useState('');
  const [showUploader, setShowUploader] = useState(false);

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleAddYear = () => {
    const yearNum = parseInt(inputYear, 10);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
      setError(`Please enter a valid year between 1900 and ${currentYear}.`);
      return;
    }

    if (years.includes(yearNum)) {
      setError(`Year ${yearNum} is already added.`);
      return;
    }

    setYears([...years, yearNum]);
    setInputYear('');
    setError('');
  };

  const handleOCRResult = (data) => {
    const { year, month, category, rawText } = data;
    const match = rawText.match(/(?:₹|Rs\.?|INR)?\s?([\d,]+(?:\.\d{2})?)/i);


    if (!match) {
      alert('❌ Could not detect amount in the image.');
      return;
    }

    const amount = parseFloat(match[0].replace(/,/g, ''));
    const description = rawText.split('\n')[0] || '';
    const date = new Date().toLocaleDateString();

    const entry = { amount, description, date };

    // Navigate to category page with entry
    navigate(`/year/${year}/${month}/${category.toLowerCase()}`, {
      state: { entry }
    });
  };

  return (
    <div className="container py-4">
      <h2 className="text-primary mb-4">Finance Tracker</h2>

      <button
        className="btn btn-outline-primary mb-3 ms-2"
        onClick={() => setShowUploader(prev => !prev)}
      >
        📤 Upload via Image
      </button>

      {showUploader && (
        <div className="mt-3">
          <ImageUpload onProcessed={handleOCRResult} />
        </div>
      )}

      <div className="mb-3 d-flex align-items-center gap-2">
        <input
          type="number"
          min="1900"
          max={currentYear}
          value={inputYear}
          onChange={(e) => setInputYear(e.target.value)}
          className="form-control"
          placeholder="Enter year (e.g. 2023)"
          style={{ maxWidth: '200px' }}
        />
        <button className="btn bg-primary text-light" onClick={handleAddYear}>
          ➕ Add Year
        </button>
      </div>

      {error && (
        <div className="alert alert-danger py-1 px-3">
          {error}
        </div>
      )}

      <div className="row mt-4">
        {years.map((year, index) => (
          <div className="col-md-3 col-sm-6 mb-3" key={index}>
            <div className="card shadow-sm border-0 bg-accent text-center">
              <div className="card-body">
                <h5 className="card-title">{year}</h5>
                <p className="card-text">View transactions for {year}</p>
                <Link to={`/year/${year}`} className="btn btn-outline-dark btn-sm">
                  Open
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
