import React from "react";
import {Container, Card, Col, Button, Row} from "react-bootstrap";
import Axios from "axios";
import {Link} from "react-router-dom";

export default class SuiviCommandes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commandes: []
        }
    }

    componentDidMount() {
        this.getCommandes()
    }

    getCommandes = async () => {
        const commandes = await Axios.post("http://localhost:8000/suiviCommandes", {id: localStorage.getItem("userId")});
        this.setState({commandes: commandes.data});
    }

    s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i=0; i !== s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    toExcel = async () => {
        window.location = `http://localhost:8000/toExcel?id=${localStorage.getItem("userId")}`;
    }

    render() {
        return (
            <Container className="suivi-commandes-padding">
                <h3 className={"text-ecommerce2"}>
                    Recuperer vos informations sous forme d'excel:
                </h3>
                <Button variant={"ecommerce4"} onClick={this.toExcel}>
                    Telecharger
                </Button>
                <hr/>
                <h3 className={"text-ecommerce2"}>
                    Recapitulatif des commandes qui vous ont ete passees:
                </h3>
                <hr/>
                {this.state.commandes.length === 0 && <h4 className={"text-danger"}>Aucunes commandes</h4>}
                {
                    this.state.commandes.map((x, i) => (
                        <>
                            <Card>
                                <Card.Header>
                                    <h3>{`Statut: ${x.statut}`}</h3>
                                </Card.Header>
                                <Card.Body key={i} className={"text-ecommerce2"}>
                                    <h3>{`Mail du client: ${x.email}`}</h3>
                                    <h4>{`Adresse: ${x.adresse}`}</h4>
                                    <h4>{`Total: ${x.total}€`}</h4>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <h5>{`Date: ${new Date(Date.parse(x.date)).toString()}`}</h5>
                                        </Col>
                                        <Col>
                                            <Link to={`/suiviCommandeDetail/${x.id}`}>
                                                <Button variant={"ecommerce3"}>
                                                    Details
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                            <br/>
                        </>
                    ))
                }
            </Container>
        )
    }

}