import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TRIP } from '../utils/queries';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';


const SingleTrip = props => {
  const { id: tripId } = useParams();

  const { loading, data } = useQuery(QUERY_TRIP, {
    variables: { id: tripId }
  });

  const trip = data?.trip || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {trip.username}
          </span>{' '}
          trip on {trip.createdAt}
        </p>
        <div className="card-body">
          <p>{trip.tripText}</p>
        </div>
      </div>

      {trip.reactionCount > 0 && <ReactionList reactions={trip.reactions} />}

      {Auth.loggedIn() && <ReactionForm tripId={trip._id} />}
    </div>
  );
};

export default SingleTrip;
