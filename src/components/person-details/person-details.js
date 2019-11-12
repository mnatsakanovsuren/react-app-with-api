import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.setState({
                loading: true
            });
            this.updatePerson();
        }
    }

    updatePerson = () => {
        const { personId } = this.props;
        if (personId) {
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({person, loading: false})
            });
    };

    render() {

        if (!this.state.person) {
            console.log('no person id')
        }

        if (!this.state.person) {
            return (
                <div className="person-details card">
                    <span>Select a person from list</span>
                </div>
            )
        }

        const { person, loading } = this.state;

        const content = loading ? <Spinner/> : <PersonView person={person}/>;

        return (
            <div className="person-details card">
                {content}
            </div>
        )
    }
};

const PersonView = ({person}) => {
    const { id, name, gender,
        birthYear, eyeColor} = person;

    return (
        <div className="row">
            <div className="col-md-4">
                <img className="person-details-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                     alt="character"/>
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};