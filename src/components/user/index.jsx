import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

import "./style.css";
import github from "../../api/github";
import Loading from "../common/loading";

class User extends React.Component {
  cancelTokenSource = axios.CancelToken.source();

  state = { user: "", error: null, loading: false };

  async componentDidMount() {
    try {
      this.setState({ loading: true });

      const { user } = this.props;
      const response = await axios.get(`${user.url}`, {
        cancelToken: this.cancelTokenSource.token
      });

      this.setState({ user: response.data, loading: false });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(`Axiox cancel error`);
      } else {
        this.setState({ error, loading: false });
      }
    } finally {
      this.cancelTokenSource = null;
    }
  }

  componentWillUnmount() {
    this.cancelTokenSource && this.cancelTokenSource.cancel();
  }

  render() {
    const { user, error, loading } = this.state;

    if (loading) {
      return (
        <div className="loading__container">
          <Loading />
        </div>
      );
    }

    if (error) {
      return <div className="error">{this.error}</div>;
    }

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
