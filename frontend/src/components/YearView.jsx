import React from 'react';
import { Link, useParams } from 'react-router-dom';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const YearView = () => {
  const { year } = useParams(); // Get the year from the URL

  return (
    <div className="container py-4">
      <h2 className="text-primary mb-4">Year: {year}</h2>

      <div className="row">
        {months.map((month, index) => (
          <div className="col-md-3 col-sm-6 mb-3" key={index}>
            <div className="card bg-light-yellow border-0 shadow-sm text-center">
              <div className="card-body">
                <h5 className="card-title">{month}</h5>
                <p className="card-text">View {month} data</p>
                <Link
                to={`/year/${year}/${month.toLowerCase()}`}
                className="btn btn-outline-dark btn-sm"
              >
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

export default YearView;
