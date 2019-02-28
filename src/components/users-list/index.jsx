import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import User from "../user";

const UsersList = props => {
  const { users } = props;
  const currentUsers = users.map(user => {
    return <User user={user} key={user.id} />;
  });
  return <div className="users">{currentUsers}</div>;
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};
export default UsersList;
