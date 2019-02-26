import React from "react";
import PropTypes from "prop-types";

import "./style.css";
import github from "../../api/github";

class User extends React.Component {
  state = { user: "" };

  async componentDidMount() {
    try {
      const { user } = this.props;
      const response = await github.get(`${user.url}`);
      await this.setState({ user: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="user">
        <figure className="user__info">
          <p className="user__text">{user.bio}</p>
          <p className="user__username">
            <a href={user.html_url}>{user.login}</a>
          </p>
          <figcaption className="user__user">
            <a href={user.html_url}>
              <img src={user.avatar_url} alt="avatar" className="user__photo" />
            </a>
            <div className="user__user-box">
              <p className="user__name">
                <a href={user.html_url}>{user.name}</a>
              </p>
              <p className="user__company-name">{user.company}</p>
              <p className="user__user-location">{user.location}</p>
            </div>
            <div className="user__followers">{user.followers} followers                         </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
