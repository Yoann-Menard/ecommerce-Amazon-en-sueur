import React, { Component } from "react";
import  AppBreadcrumbs  from "./BreadCrumbs";
// import { Row, Col } from 'react-bootstrap';

export default class Header extends Component {
    render(){
        return (
            <div className="header navbar">
                <div className="header-container">
                    <AppBreadcrumbs />
                </div>
            </div>
        )
    }
}