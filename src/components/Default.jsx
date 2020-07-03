import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Default extends Component{
    render () {
        return (
            <div>
                <div className="container">
                    <h1 className="error-404">Erreur 404</h1>
                    <p className="error-404-p">It looks like nothing was found at this location.</p>
                    <div className="error-404-click">
                        <Link to="/" className="error-404-home" style={{ textDecoration: 'none' }}>Page d'accueil</Link>
                    </div>
                </div>
            </div>
        )
    }
}
