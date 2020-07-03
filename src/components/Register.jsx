import React, {Component} from "react";
// import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import {Form} from "react-bootstrap";
import axios from 'axios';
// import Login from "./Login";

export default class Register extends Component {
    constructor(props) {
        super(props);
        //Ca permet l'utilisattion de 'this' dans la fonction de rappel
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeEmailconfirm = this.onChangeEmailconfirm.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordconfirm = this.onChangePasswordconfirm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.showPassword = this.showPassword.bind(this);

        this.state = {
            username: '',
            email: '',
            emailconfirm: '',
            password: '',
            passwordconfirm: '',
            user: [],
            hidden: true,
            loading: false,
            errors: {},
            register: true,
            vendeur: false
        }

    }


    showPassword() {
        this.setState({hidden: !this.state.hidden});
    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangePasswordconfirm(e) {
        this.setState({
            passwordconfirm: e.target.value
        });
    }

    onChangeEmailconfirm(e) {
        this.setState({
            emailconfirm: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        let role = "";
        if(!this.state.vendeur) role = "client";
        else role = "vendeur";

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role: role
        }
        const config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        }
        console.log(user)

        axios
            .post("http://localhost:8000/register", user, config)
            .then(res => {
                if (res.data)
                    window.location = "http://localhost:3000";
                else this.setState({error: "erreur"})
                console.log(res.data);
                // this.setState({
                //     loading: false
                // });
                // this.props.history.push('/')
            })
        // .catch(err => {
        //     this.setState({
        //         errors: err.response.data,
        //         loading: false
        //     })
        // })
    }


    render() {

        const {errors} = this.state;
        let k = 0;

        return (
            <div className="container-register">
                <div style={{paddingBottom: "30px"}}>
                    <img
                        src="/logo.png"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </div>
                <h3 className="register-h3">DEVENEZ MEMBRE DE PRINT'N GO</h3>
                <p className="register-p">Créez-toi un profil de vendeur pour rejoindre notre communauté et partager tes oeuvres où devient membre Print'n go en tant que client pour accéder au meilleur des produits publiés par nos vendeur.</p>
                <form onSubmit={this.onSubmit}>
                    <div className="register-form">
                        <div className="register-form-two">
                            <div className="register-input">
                                {/* <label>Votre Pseudo :</label> */}
                                <TextField style={{ width: '230px' }}
                                           id="username"
                                           name="username"
                                           type="text"
                                           placeholder="Nom d'utilisateur"
                                           helperText={errors.username}
                                           error={errors.username ? true : false}
                                           value={this.state.username}
                                           onChange={this.onChangeUsername}
                                />
                            </div>
                            <div className="register-input">
                                {/* <label> Votre Adresse E-mail :</label> */}
                                <TextField style={{ width: '230px' }}
                                           id="email"
                                           name="email"
                                           type="email"
                                           placeholder=" Adresse E-mail"
                                           helperText={errors.email}
                                           error={errors.email ? true : false}
                                           value={this.state.email}
                                           onChange={this.onChangeEmail}
                                />
                            </div>
                            <div className="register-input">
                                {/* <label>Confirmez votre Adresse E-mail :</label> */}
                                <TextField  style={{ width: '230px' }}
                                            type="email"
                                            name="emailconfirm"
                                            id="emailconfirm"
                                            placeholder="confirmez votre adresse e-mail"
                                            helperText={errors.emailconfirm}
                                            error={errors.emailconfirm ? true : false}
                                            required value={this.state.emailconfirm}
                                            onChange={this.onChangeEmailconfirm}
                                />
                            </div>
                            <div className="register-input">
                                {/* <label>Mot de passe :</label> */}
                                <TextField style={{ width: '230px', marginLeft:'19px' }}
                                           id="password"
                                           name="password"
                                           placeholder="Mot de passe"
                                           helperText={errors.password}
                                           error={errors.password ? true : false}
                                           type={this.state.hidden ? "password" : "text"}
                                           value={this.state.password}
                                           onChange={this.onChangePassword}
                                />
                                <i className="fas fa-eye" onClick={this.showPassword}></i>
                            </div>
                            <div className="register-input">
                                {/* <label>Confirmez Votre mot de passse</label> */}
                                <TextField style={{ width: '230px', marginLeft:'19px' }}
                                           type={this.state.hidden ? "password" : "text"}
                                           name="passwordconfirm"
                                           id="passwordconfirm"
                                           placeholder="Confirmez votre mot de passe"
                                           helperText={errors.passwordconfirm}
                                           error={errors.passwordconfirm ? true : false}
                                           value={this.state.passwordconfirm}
                                           onChange={this.onChangePasswordconfirm}
                                />
                                <i className="fas fa-eye" onClick={this.showPassword}></i>
                            </div>
                        </div>
                    </div>
                    <Form.Check onChange={async() => {
                        if(this.state.vendeur === false) await this.setState({vendeur: true});
                        else await this.setState({vendeur: false});
                        console.log(this.state.vendeur)
                    }} type="checkbox" label="Cochez la case si vous souhaité être vendeur" />
                    <Button
                        type="submit"
                        variante="contained"
                        color="primary"
                        className="register-button e">
                        REJOIGNEZ-NOUS
                    </Button>
                    {/* <Button
                        variante="contained"
                        color="primary"
                        onClick={() => this.setState({register: null})}>
                        Se Connecter
                    </Button>     */}
                </form>
            </div>
        )
    }
}
