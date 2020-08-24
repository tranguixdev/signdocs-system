/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/user';
import { fetchSignature, updateSignature } from '../../actions/signature';
import { getCurrentUser, getCurrentUserSig } from '../../reducers/selectors';
import { UserPropTypeShape, SigPropTypeShape } from '../propTypes';
import Profile from './Profile';

class ProfileContainer extends Component {
  componentDidMount() {
    const { fetchMe, user, fetchSig } = this.props;
    fetchMe(user.id).then((u) => {
      fetchSig(u.user.sigId);
    });

    if (user) {
      document.title = `SignDocs - Profile`;
    }
  }

  render() {
    if (!this.props.user || Object.keys(this.props.user).length === 0)
      return <div />;
    const { user, sig, updateSig } = this.props;
    return (
      <div>
        <Profile user={user} sig={sig} updateSig={updateSig} />
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  user: UserPropTypeShape.isRequired,
  sig: SigPropTypeShape.isRequired,
  fetchMe: PropTypes.func.isRequired,
  fetchSig: PropTypes.func.isRequired,
  updateSig: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: getCurrentUser(state),
    sig: getCurrentUserSig()(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMe: (userId) => dispatch(fetchUser(userId)),
    fetchSig: (sigId) => dispatch(fetchSignature(sigId)),
    updateSig: (sigData) => dispatch(updateSignature(sigData)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileContainer),
);