import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Traits list
    const traits = profile.traits.map((trait, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {trait}
      </div>
    ))

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{profile.handle}'s Bio</h3>
            <p className="lead">{isEmpty(profile.bio) ? 
              (<span>{profile.handle} does not have a bio</span>) : (<span>{profile.bio}</span>)}
            </p>
            <hr />
            <h3 className="text-center text-info">Traits</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {traits}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
