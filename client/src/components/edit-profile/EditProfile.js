import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';


class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            location: '',
            traits: '',
            bio: '',
            milestone: '',
            youtube: '',
            twitter: '',
            facebook: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Bring traits array back to CSV
            const traitsCSV = profile.traits.join(',');

            // If profile field doesn't exist, make empty string
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
        
            // Set component fields state
            this.setState({
                handle: profile.handle,
                location: profile.location,
                traits: traitsCSV,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                youtube: profile.youtube,
                instagram: profile.instagram
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            location: this.state.location,
            traits: this.state.traits,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

  render() {
      const {errors, displaySocialInputs} = this.state;

      let socialInputs;

      if(displaySocialInputs){
        socialInputs = (
            <div>
                <InputGroup
                    placeholder="YouTube Channel URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                />
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                />
                <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                />
                <InputGroup
                    placeholder="Instagram Page URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                />
            </div>
        )
      }

    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit Profile</h1>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your pets profile URL. The pets nickname or full name"
                        />
                        <TextFieldGroup
                            placeholder="Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                            info="Where does your pet currently live? (City, State (e.g. Portland, Oregon))"
                        />
                        <TextFieldGroup
                            placeholder="Traits"
                            name="traits"
                            value={this.state.traits}
                            onChange={this.onChange}
                            error={errors.traits}
                            info="Please use comma separated values (e.g. Silly,Stubborn,Charismatic)"
                        />
                        <TextAreaFieldGroup
                            placeholder="Short Bio"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info="Tell us a little more about your pet"
                        />
                        <div className="mb-3">
                            <button 
                                type="button"
                                onClick={() => {
                                this.setState(prevState => ({
                                    displaySocialInputs: !prevState.displaySocialInputs
                                }));
                            }} 
                            className="btn btn-light">
                                Add Social Network Links
                            </button>
                            <span className="text-muted">  Optional</span>
                        </div>
                        {socialInputs}
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>       
      </div>
    )
  }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));
