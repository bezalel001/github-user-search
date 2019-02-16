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
        <ul className="list">
          <li className="list__item">Followers</li>
          <li className="list__item">
            <a href={user.followers_url}>See followers</a>
          </li>
          <li className="list__item">Following</li>
          <li className="list__item">
            <a href={user.following_url}>See following</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

User.propsTypes = {
  user: PropTypes.object
};

export default User;
