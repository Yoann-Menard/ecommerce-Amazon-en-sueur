import React from "react";
import {Container, Card, Col, Button, Row, FormControl, Form} from "react-bootstrap";
import Axios from "axios";
import {Link} from "react-router-dom";

export default class MesCommandes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commandes: [],
            search: {},
            isFind: false,
            id: localStorage.getItem("userId"),
            searchTerm: ""
        }
    }

    componentDidMount() {
        this.getCommandes()

    }

    getCommandes = async () => {
        const commandes = await Axios.post("http://localhost:8000/mesCommandes", {id: this.state.id});
        console.log(commandes.data);
        this.setState({commandes: commandes.data});
    };
    getSearchOrder = async (e) => {
        e.preventDefault();

        const search = await Axios.post("http://localhost:8000/searchOrder", {searchTerm: this.state.searchTerm})
            .then((response) => {
                this.setState({
                    search: response.data,
                    isFind: true,
                });
                console.table(this.state.search)
                console.log(typeof (this.state.search))
            }, (error) => {
                console.log("caca")
                console.table("Error", this.state.search);
                console.log(error)
            });
    };

    render() {
        let result = this.state.search;
        const isFind = this.state.isFind;

        return (
            <Container className="container-mes-commandes">
                <Form inline>
                    <FormControl type="text" onChange={(e) => this.setState({searchTerm: e.target.value})}
                                 placeholder="Rentrez l'id de votre commande" className="mr-sm-2"/>
                    <Link to={this.state.search}>
                        <Button onClick={this.getSearchOrder}>rechercher</Button>
                    </Link>
                </Form>
                <hr/>
                <h3 className={"text-ecommerce1"}>
                    Recapitulatif de vos commandes:
                </h3>
                <br/>

                {this.state.commandes.length === 0 && <h4 className={"text-danger"}>Aucunes commandes</h4>}
                {this.state.search === 0 && <h4 className={"text-danger"}>Aucun resultat</h4>}

                {
                    !isFind && this.state.commandes.map((x, i) =>
                        <>
                            <Card key={i}>
                                <Card.Header>
                                    <h3>{`Statut: ${x.statut}`}</h3>
                                </Card.Header>
                                <Card.Body className={"text-ecommerce2"}>
                                    <h3>{`Boutique: ${x.boutique}`}</h3>
                                    <h4>{`Adresse: ${x.adresse} ${x.code_postal} ${x.ville}`}</h4>
                                    <h4>{`Total: ${x.prix_total}€`}</h4>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <h5>{`Date: ${new Date(Date.parse(x.date)).toString()}`}</h5>
                                        </Col>
                                        <Col>
                                            <Link to={`/commandeDetail/${x.id}`}>
                                                <Button variant={"ecommerce4"}>
                                                    Details
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </>
                    )}
                {isFind &&
                <>
                    <Card>
                        <Card.Header>
                            <h3>{`Statut: ${result.statut}`}</h3>
                        </Card.Header>
                        <Card.Body className={"text-ecommerce2"}>
                            <h3>{`Boutique: ${result.sell_name}`}</h3>
                            <h4>{`Adresse: ${result.adresse} ${result.code_postal} ${result.ville}`}</h4>
                            <h4>{`Total: ${result.prix_total}€`}</h4>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <h5>{`Date: ${result.date}`}</h5>
                                </Col>
                                <Col>
                                    <Link to={`/commandeDetail/${result.id}`}>
                                        <Button variant={"ecommerce4"}>
                                            Details
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                    <br/>
                </>
                }

            </Container>
        )
    }

}
