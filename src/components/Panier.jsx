import React from "react";
import {Button, Card, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import Axios from "axios";
import STLViewer from "stl-viewer";
import {Link} from "react-router-dom";

export default class Panier extends React.Component {
    constructor(props) {
        super(props);
        let connected = null;
        let panier = [];
        if (localStorage.getItem("userId") !== null && localStorage.getItem("userId") !== undefined)
            connected = true;
        if (localStorage.getItem("panier") !== null)
            panier = JSON.parse(localStorage.getItem("panier"));
        this.state = {
            date: new Date(),
            panier: panier,
            total: 0,
            adresse: "",
            isConnected: connected,
            pays: [],
            livraison: 0,
            ville: "",
            nom: "",
            prenom: "",
            idPays: "",
            codePostal: "",
            dateCarte: "",
            ccvCarte: "",
            numeroCarte: "",
            isSub: false,
            economie: 0,
            showCCV: null,
            numeroMasque: "",
            verifCCV: true,
            emballage: false
        }
    }

    componentDidMount() {
        this.refreshPanier();
        this.getPays();
        this.getInfo();
        this.getAbo();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isConnected)
            this.setState({isConnected: true});
    }

    getInfo = async () => {
        if (this.state.isConnected !== null) {
            const res = await Axios.post("http://localhost:8000/getAdresse", {id: localStorage.getItem("userId")});
            console.log(res.data);
            if (res.data.carte)
                this.setState({
                    dateCarte: res.data.carte.date,
                    numeroCarte: res.data.carte.numero,
                    ccvCarte: res.data.carte.ccv,
                    showCCV: true,
                    numeroMasque: res.data.carte.numeroMasque,
                    verifCCV: false
                });
            if (res.data.adresse)
                this.setState({
                    adresse: res.data.adresse.adresse,
                    codePostal: res.data.adresse.code_postal,
                    idPays: res.data.adresse.id_pays,
                    nom: res.data.adresse.nom,
                    prenom: res.data.adresse.prenom,
                    ville: res.data.adresse.ville,
                    livraison: this.state.pays[res.data.adresse.id_pays].prix,
                })
        }
    }

    refreshPanier = (e) => {
        const panier = JSON.parse(localStorage.getItem("panier"));
        let total = 0;
        let economie = 0
        for (let i = 0; i < panier.length; i++) {
            if (!this.state.isSub)
                total += ((parseInt(panier[i].total) * parseFloat(panier[i].price)) + (parseInt(panier[i].total) * this.state.livraison));
            else {
                total += ((parseInt(panier[i].total) * parseFloat(panier[i].price)) + ((parseInt(panier[i].total) * this.state.livraison) / 2));
                economie += (parseInt(panier[i].total) * this.state.livraison) / 2;
            }
        }
        this.setState({panier: panier, total: total, economie: economie})
    }

    changePays = async (e) => {
        await this.setState({
            livraison: this.state.pays[e.target.value].prix,
            idPays: this.state.pays[e.target.value].id - 1
        });
        this.refreshPanier();
    }

    getPays = async () => {
        const res = await Axios.post("http://localhost:8000/getPays");
        this.setState({pays: res.data});
    }

    deletePanier = async (e) => {
        let panier = JSON.parse(localStorage.getItem("panier")).filter((x, i) => i !== parseInt(e.target.value));
        await localStorage.setItem("panier", JSON.stringify(panier));
        this.refreshPanier();
        this.props.refresh();
        window.location.reload();
    }

    sendCommande = async (e) => {
        let userId = localStorage.getItem("userId");
        if (userId === null)
            userId = 0;
        const body = {
            articles: this.state.panier,
            adresse: this.state.adresse,
            userId: userId,
            ville: this.state.ville,
            nom: this.state.nom,
            prenom: this.state.prenom,
            idPays: this.state.idPays,
            codePostal: this.state.codePostal,
            date: this.state.dateCarte,
            ccv: this.state.ccvCarte,
            carteNumero: this.state.numeroCarte,
            emballage: this.state.emballage
        }
        console.log(body)
        const response = await Axios.post("http://localhost:8000/commande", body);
        if (response.data) {
            localStorage.setItem("panier", JSON.stringify([]));
            this.props.refresh();
            window.location = "http://localhost:3000/mesCommandes";
        }
    }

    changeTotal = (e, i) => {
        if (e.target.value === "" || e.target.value < 1)
            e.target.value = 1;
        let {panier} = this.state;
        panier[i].total = e.target.value;
        localStorage.setItem("panier", JSON.stringify(panier));
        this.refreshPanier();
        this.props.refresh();
    }

    getAbo = async () => {
        if (localStorage.getItem("userId") !== null) {
            const res = await Axios.post("http://localhost:8000/getAbo", {id: localStorage.getItem("userId")});
            if (res.data) this.setState({isSub: true});
            this.refreshPanier();
        }
    }

    verifCCV = (e) => {
        this.setState({verifCCV: parseInt(e.target.value) === this.state.ccvCarte})
    }

    newCard = (e) => {
        this.setState({
            dateCarte: "",
            numeroCarte: "",
            ccvCarte: "",
            showCCV: null,
            numeroMasque: "",
            verifCCV: true
        })
    }

    render() {
        return (
            <Container className="mon-panier-padding">
                <Row>
                    {this.state.panier.map((x, i) => (
                        <>
                            <Col lg={4} sm={12} md={6}>
                                <Card bg={"light"} key={i}>
                                    {
                                        x.photo.split(".")[x.photo.split(".").length - 1] !== "stl" && x.photo.split(".")[x.photo.split(".").length - 1] !== "STL" &&
                                        <Card.Img style={style.boutique} variant="top"
                                                  src={`http://localhost:8000${x.photo}`}/>
                                    }
                                    {
                                        x.photo.split(".")[x.photo.split(".").length - 1] === "stl" | x.photo.split(".")[x.photo.split(".").length - 1] === "STL" &&
                                        <STLViewer
                                            model={x.photo}
                                            width={300}
                                            height={300}
                                            modelColor={"red"}
                                            backgroundColor='#EAEAEA'
                                            rotate={true}
                                            orbitControls={true}
                                        />
                                    }
                                    <Card.Body>
                                        <Card.Text className="text-ecommerce1">
                                            <h3 className="text-ecommerce2">{x.name}</h3>
                                            {x.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Row>
                                            <Col>
                                                <h4>{`${x.price}€`}</h4>
                                            </Col>
                                            <Col>
                                                <h5>{`${x.total} articles`}</h5>
                                                <FormControl type="number" value={x.total}
                                                             onChange={(e) => this.changeTotal(e, i)}/>
                                            </Col>
                                            <Col>
                                                <Button value={i} variant={"danger"} onClick={this.deletePanier}>
                                                    Supprimer
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                                <br/>
                            </Col>
                        </>
                    ))}
                </Row>
                {this.state.date.getMonth() === 5 && <Row>
                    <Form style={{marginLeft: "50px"}} className={"text-success"}>
                        <Form.Check type="radio" label="Beneficiez d'un emballage gratuit!" onChange={(e) => this.setState({emballage: true})}/>
                    </Form>
                </Row>}
                <h5 className={"text-ecommerce4"}>
                    {`Total: ${this.state.total}€`}
                </h5>
                {
                    this.state.isSub && <h5 className={"text-success"}>
                        {`Vous avec economise ${this.state.economie}€ grace a votre abonement premium!`}
                    </h5>
                }
                <Row>
                    {this.state.total > 0 && <>
                        <Col>
                            <Form>
                                <h5>Vos informations de livraison:</h5>
                                <FormControl type="text" placeholder="Votre nom" value={this.state.nom}
                                             onChange={(e) => this.setState({nom: e.target.value})}/>
                                <FormControl type="text" placeholder="Votre prenom" value={this.state.prenom}
                                             onChange={(e) => this.setState({prenom: e.target.value})}/>
                                <FormControl type="number" placeholder="Votre code postal" value={this.state.codePostal}
                                             onChange={(e) => this.setState({codePostal: e.target.value})}/>
                                <FormControl type="text" placeholder="Votre ville" value={this.state.ville}
                                             onChange={(e) => this.setState({ville: e.target.value})}/>
                                <FormControl type="text" placeholder="Votre adresse" value={this.state.adresse}
                                             onChange={(e) => this.setState({adresse: e.target.value})}/>
                                <Form.Control as="select" onChange={this.changePays} value={this.state.idPays} custom>
                                    {
                                        this.state.pays.map((x, i) => (
                                            <option idPays={x.id} value={x.id}>{x.pays}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form>
                        </Col>
                        <Col>
                            {!this.state.showCCV && <>
                                <h5>Vos informations bancaires:</h5>
                                <FormControl type="" placeholder="Votre numero de carte" value={this.state.numeroCarte}
                                             onChange={(e) => this.setState({numeroCarte: e.target.value})}/>
                                <FormControl type="number" placeholder="Votre CCV" value={this.state.ccvCarte}
                                             onChange={(e) => this.setState({ccvCarte: e.target.value})}/>
                                <FormControl type="text" placeholder="mm/yy" value={this.state.dateCarte}
                                             onChange={(e) => this.setState({dateCarte: e.target.value})}/>
                            </>}
                            {this.state.showCCV && <>
                                <h5>Confirmer votre CCV</h5>
                                <hr/>
                                <h5>{this.state.numeroMasque}</h5>
                                <FormControl type="number" placeholder="Votre CCV" onChange={this.verifCCV}/>
                                <hr/>
                                <Button variant={"ecommerce4"} onClick={this.newCard}>
                                    Rentrer une nouvelle carte
                                </Button>
                            </>}
                        </Col>
                        <Col>
                            {this.state.verifCCV && this.state.isConnected &&
                            <Button variant={"ecommerce3"} onClick={this.sendCommande}>
                                Commander
                            </Button>}
                            {!this.state.isConnected && <>
                                <Button variant={"ecommerce3"} onClick={this.sendCommande}>
                                    Commander sans se connecter
                                </Button>
                                <Link to={"/register"}>
                                    <Button variant={"ecommerce2"}>
                                        Inscription
                                    </Button>
                                </Link>
                            </>}
                        </Col>
                    </>}
                </Row>
            </Container>
        )
    }
}

const style = {
    boutique: {
        cursor: "pointer"
    }
}