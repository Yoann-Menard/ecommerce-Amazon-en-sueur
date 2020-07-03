import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
    render () {
        return (
            <div className="header-link">
                <Link style={{ textDecoration: 'inherit'}} to="/populaires">Meilleurs ventes</Link>
                <Link style={{ textDecoration: 'inherit'}} to="/newest">Dernières Nouveautés</Link>
                <Link style={{ textDecoration: 'inherit'}} to="/boutiques">Nos vendeurs</Link>
                <Link style={{ textDecoration: 'inherit'}} to="/reduction">Réduction</Link>
                <Link style={{ textDecoration: 'inherit'}} to="/cadeaux">Chèques-cadeaux</Link>
            </div>
        )
    }
}
