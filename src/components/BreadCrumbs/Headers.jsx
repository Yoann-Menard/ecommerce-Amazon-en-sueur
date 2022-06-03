import React, { Component } from "react";
import  AppBreadcrumbs  from "./BreadCrumbs";

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