import React, { Component } from "react";
import "../css/font.css";
import {Row} from "react-bootstrap";

export default class Footer extends Component {
    render () {
        return (
            <footer>
                <div className="footer-un d-print-none">
                    <section className="container">
                        <div className="footer-about">
                            <div className="footer-container-about">
                                <div className="footer-title">
                                    <strong className="footer-h2-color">À propos</strong>
                                </div>
                                <ul className="footer-ul">
                                    <a href="#"><li className="footer-li-color">À propos</li></a>
                                    <a href="#"><li className="footer-li-color">Notre plateforme</li></a>
                                    <a href="#"><li className="footer-li-color">Contrôle qualité</li></a>
                                    <a href="#"><li className="footer-li-color">Protection IP</li></a>
                                    <a href="#"><li className="footer-li-color">Nos partenaires</li></a>
                                </ul>
                            </div>
                            <div className="footer-container-about">
                                <div className="footer-title">
                                    <strong className="footer-h2-color">Capacité de production</strong>
                                </div>
                                <ul className="footer-ul">
                                    <a href="#"><li className="footer-li-color">Service d'impression 3D</li></a>
                                    <a href="#"><li className="footer-li-color">Service d'usinage 3D</li></a>
                                    <a href="#"><li className="footer-li-color">Marquage de pièce 3D</li></a>
                                    <a href="#"><li className="footer-li-color">Finition de surface</li></a>
                                </ul>
                            </div>
                            <div className="footer-container-about">
                                <div className="footer-title">
                                    <strong className="footer-h2-color">Matières</strong>
                                </div>
                                <ul className="footer-ul">
                                    <a href="#"><li className="footer-li-color">Plastiques en impression 3D</li></a>
                                    <a href="#"><li className="footer-li-color">Métaux en impression 3D</li></a>
                                    <a href="#"><li className="footer-li-color">Du bois en impression 3D</li></a>
                                    <a href="#"><li className="footer-li-color">aluminium en impression 3D</li></a>
                                </ul>
                            </div>
                            <div className="footer-container-about">
                                <div className="footer-title">
                                    <strong className="footer-h2-color">Contact</strong>
                                </div>
                                <ul className="footer-ul">
                                    <a href="#"><li className="footer-li-color">Bureaux</li></a>
                                    <a href="#"><li className="footer-li-color">Événement</li></a>
                                    <a href="#"><li className="footer-li-color">Écrivez-nous</li></a>
                                    <a href="#"><li className="footer-li-color">Appelez-nous au <a>+33 123456789</a></li></a>
                                    <a href="#"><li className="footer-li-color">Aide</li></a>
                                    <a href="#"><li className="footer-li-color">Obtenir un devis Instantané</li></a>
                                    <a href="#"><li className="footer-li-color">Demander une demo</li></a>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="footer-deux">
                    <section className="container">
                        <div className="footer-logo">
                            <a href="https://fr-fr.facebook.com/" className="footer-a-logo d-print-none" target="_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/?hl=fr" className="footer-a-logo d-print-none" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a href="https://twitter.com/explore" className="footer-a-logo d-print-none" target="_blank"><i class="fab fa-twitter"></i></a>
                            <a href="https://www.youtube.com/" className="footer-a-logo d-print-none" target="_blank"><i class="fab fa-youtube"></i></a>
                            <a href="https://gitlab.com/" className="footer-a-logo d-print-none" target="_blank"><i class="fab fa-gitlab"></i></a>
                        </div>
                    </section>
                </div>
            </footer>
        )
    }
}
