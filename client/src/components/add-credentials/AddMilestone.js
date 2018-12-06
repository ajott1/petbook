import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMilestone } from '../../actions/profileActions';

class AddMilestone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            location: '',
            when: '',
            description: '',
            errors: {},
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const milestoneData = {
            title: this.state.title,
            location: this.state.location,
            when: this.state.when,
            description: this.state.description,
        };

        this.props.addMilestone(milestoneData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                    Go Back
                    </Link>
                    <h1 className="display-4 text-center">Add Milestone</h1>
                    <p className="lead text-center">
                        Add any milestone from your pets life (e.g. birthdays, firsts, anything exciting!)
                    </p>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder="* Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        error={errors.title}
                    />
                    <TextFieldGroup
                        placeholder="Location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                    />
                    <h6>Date</h6>
                    <TextFieldGroup
                        name="when"
                        type="date"
                        value={this.state.when}
                        onChange={this.onChange}
                        error={errors.when}
                    />
                    <TextAreaFieldGroup
                        placeholder="Description" 
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        error={errors.description}
                        info="Tell us a little bit about your pet's milestone"
                    />
                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

AddMilestone.propTypes = {
    addMilestone: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addMilestone })(withRouter(AddMilestone));