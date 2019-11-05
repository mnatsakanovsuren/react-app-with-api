import React, {Component} from 'react';

import SwapiService from "../../services/swapi-service";

import Spinner from "../spinner";

import './random-planet.css';
import '../spinner/spinner.css';

export default class RandomPlanet extends Component{
    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true
    };

    constructor() {
        super();
        this.updatePlanet();
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        });
    };

    updatePlanet() {
        // const id = Math.floor(Math.random()*25 + 2);
        const id = 12;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
    }

    render() {
        const { planet, loading } = this.state;

        return (
            <div className="random-planet jumbotron rounded">
                {!loading ? <PlanetView planet={planet}/> : <Spinner/>}
            </div>
        )
    }
};

const PlanetView = ({ planet }) => {

    const { id, name, population,
        rotationPeriod, diameter } = planet;

    return (
        <React.Fragment>
            <div className="planet-image-wrap">
                <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="" className="planet-image"/>
            </div>
            <div className="random-planet-info">
                <h4>{name} id: {id}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
};