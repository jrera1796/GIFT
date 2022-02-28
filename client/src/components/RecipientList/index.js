import React from 'react';
import { Link } from 'react-router-dom';

const RecipientList = ({ recipientsCount, username, recipients }) => {
  if (!recipients || !recipients.length) {
    return <p className="bg-dark text-light p-3">{username}, add some recipients!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {recipientsCount} {recipientsCount === 1 ? 'recipients' : 'recipients'}
      </h5>
      {recipients.map(recipients => (
        <button className="btn w-100 display-block mb-2" key={recipients._id}>
          <Link to={`/profile/${recipients.username}`}>{recipients.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default RecipientList;
