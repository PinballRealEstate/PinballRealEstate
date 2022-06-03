import React from 'react';

export default function SchoolCard({ school }) {
  return (
    <div>
      {school.ratings.great_schools_rating ?
        <div className='flex-row'>
          <p className="school-grade">
            <b className="school-value">{school.ratings.great_schools_rating}</b>
        /10
          </p>
          <div className="school-item" >
            <p>
              <b>{school.name}</b>
            </p>
            <p>
           Grades:<b>{school.grades.range.low}-{school.grades.range.high}</b>   
           Distance:<b>{school.distance_in_miles}</b>
            </p>
          </div>
        </div> : null }
    </div>
  );
}
