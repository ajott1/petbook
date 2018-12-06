import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteMilestone } from '../../actions/profileActions';

class Milestone extends Component {
    onDeleteClick(id) {
        this.props.deleteMilestone(id);
    }

    render() {
        const milestone = this.props.milestone.map(ms => (
            <tr key={ms._id}>
                <td>{ms.title}</td>
                <td>{ms.location}</td>
                <td><Moment format="YYYY/MM/DD">{ms.when}</Moment></td>
                <td><button onClick={this.onDeleteClick.bind(this, ms._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))

        return (
            <div>
                <h4 className="mb-4">Milestones</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    {milestone}
                </table>
            </div>
        )
    }
}

Milestone.propTypes = {
    deleteMilestone: PropTypes.func.isRequired
}

export default connect(null, { deleteMilestone })(Milestone);