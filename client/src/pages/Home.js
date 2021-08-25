import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_TRIPS } from '../utils/queries';
import TripList from '../components/TripList';
import { QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import TripForm from '../components/TripForm';




const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_TRIPS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const trips = data?.trips || [];
  // console.log(trips);
  const loggedIn = Auth.loggedIn();


  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <TripForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TripList trips={trips} title="Where in the world ???" />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
