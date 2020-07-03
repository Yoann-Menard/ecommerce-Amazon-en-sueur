import React from "react";
import STLViewer from "stl-viewer";
import {Button, Form, Col} from "react-bootstrap";

export default class StlDevis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: true,
            color: "#6d071a",
            coeff: {
                "#6d071a": 1,
                "#0035AD": 1.1,
                "#0B2345": 1.3,
                "#cbb341": 1.3,
                "#f1dec0": 1.5,
                "#BED9ED": 1.3,
                "#73685a": 1.8,
                "#8b5a2b": 2.3,
                "#aaa9ad": 3.8,
                "#36454f": 4.3,
                "#ccff00": 1.5
            },
            coeffDevis: 1,
            click: false,
            comment: "Aucun commentaire",
            poids: 15
        }
    }


    changeColor = (e) => {
        this.setState({
            color: e.target.value,
            coeffDevis: this.state.coeff[e.target.value]
        });
        this.showDevis();
    }

    showDevis = (e) => {
        this.setState({
            devis: true,
            price: (this.state.poids * this.state.coeffDevis) / 2,
            click: true
        })
    }

    addPanier = (e) => {
        let article = {
            id_vendeur: 0,
            name: "Article personalise",
            id: 0,
            total: 1,
            price: this.state.price,
            description: this.state.comment,
            photo: `http://localhost:8000/stl/${this.props.path}${this.props.url}`
        };
        let panier = JSON.parse(localStorage.getItem("panier"));
        panier === null ? panier = [article] : panier.push(article);
        localStorage.setItem("panier", JSON.stringify(panier));
        this.props.refresh();
    }

    render() {
        return (
            <Col lg={12}>
                <STLViewer
                    model={`http://localhost:8000/stl/${this.props.path}${this.props.url}`}
                    width={400}
                    height={400}
                    modelColor={this.state.color}
                    backgroundColor='#EAEAEA'
                    rotate={true}
                    orbitControls={true}
                />
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Filament:</Form.Label>
                        <Form.Control as="select" onChange={this.changeColor} custom>
                            <option value={"#6d071a"}>ABS</option>
                            <option value={"#0035AD"}>PLA</option>
                            <option value={"#0B2345"}>PET</option>
                            <option value={"#cbb341"}>PETT</option>
                            <option value={"#f1dec0"}>Nylon</option>
                            <option value={"#BED9ED"}>PVA</option>
                            <option value={"#73685a"}>Gres</option>
                            <option value={"#8b5a2b"}>Bois</option>
                            <option value={"#aaa9ad"}>Metal</option>
                            <option value={"#36454f"}>Carbon</option>
                            <option value={"#ccff00"}>Phosphorecent</option>
                        </Form.Control>
                        {
                            this.state.validate && <>
                                <Form>
                                    <Form.Group controlId="formBasicRange">
                                        <Form.Label>{`Poids: ${this.state.poids} grammes`}</Form.Label>
                                        <Form.Control value={this.state.poids} type="range" onChange={(e) => {
                                            this.setState({poids: e.target.value});
                                            this.showDevis();
                                        }}/>
                                    </Form.Group>
                                </Form>
                                <br/>
                                <Button variant={"ecommerce3"} onClick={this.showDevis}>
                                    Faire un devis
                                </Button>
                            </>
                        }
                        {
                            this.state.devis && <>
                                <h2>{`${this.state.price}€`}</h2>
                                <Button variant={"ecommerce3"} onClick={this.addPanier}>Valider</Button>
                            </>
                        }
                    </Form.Group>
                </Form>
            </Col>
        )
    }
}