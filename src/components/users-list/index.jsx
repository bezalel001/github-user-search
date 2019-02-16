import React from 'react';
import PropTypes from 'prop-types';

import User from '../user';

const UsersList = props => {
  const users = props.users.map(user => {
    return <User user={user} key={user.id} />;
  });
  return <div>{users}</div>;
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};
export default UsersList;
