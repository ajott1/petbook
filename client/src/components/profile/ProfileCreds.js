import React, { Component } from 'react'
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { milestone } = this.props;

    const milestoneItems = milestone.map(ms => (
      <li key={ms._id} className="list-group-item">
        <h4>{ms.title}</h4>
        <p><Moment format="YYYY/MM/DD">{ms.when}</Moment></p>
        <p>{ms.location === '' ? null : (<span><strong>Location: </strong>{ms.location}</span>)}</p>
        <p>{ms.description === '' ? null : (<span><strong>description: </strong>{ms.description}</span>)}</p>
      </li>
    ))

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-info">Milestones</h3>
          {milestoneItems.length > 0 ? (
            <ul className="list-group">{milestoneItems}</ul>
          ) : (
            <p className="text-center">No Milestones Listed</p>
          )}
        </div>
      </div>
    )
  }
}

export default ProfileCreds;