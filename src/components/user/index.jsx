import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const User = props => {
  const { user } = props;

  return (
    <div className="user">
      <figure className="user__shape">
        <img
          className="user__img"
          src={user.avatar_url}
          alt="Github user profile"
        />
        <figcaption className="user__caption">{user.login}</figcaption>
      </figure>
      <div className="user__text">
        <h3>
          <a href={user.html_url}>{user.login}</a>
        </h3>
        <ul className="user__detail">
          <li className="user__detail-item">Followers</li>
          <li className="user__detail-item">
            <a href={user.followers_url}>See followers</a>
          </li>
          <li className="user__detail-item">Following</li>
          <li className="user__detail-item">
            <a href={user.following_url}>See following</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

User.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
};

export default User;
