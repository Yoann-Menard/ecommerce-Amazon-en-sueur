import React from "react";
import { Button, Col, Container, Form, FormControl, Row, Badge } from "react-bootstrap";
import Axios from "axios";

export default class Modify extends React.Component {
    constructor(props) {
        super(props);
        let pourcent = [];
        for (let i = 0; i < 100; i++)
            pourcent.push(true);
        this.state = {
            id: window.location.href.split("/")[4],
            description: null,
            name: null,
            stock: null,
            price: null,
            photo: null,
            pourcent: pourcent,
            pays: [],
            categoriesResult: [],
            categories: []
        };
    }

    componentDidMount() {
        this.getPays();
        this.refreshCategorie();
    }

    getPays = async () => {
        const res = await Axios.post("http://localhost:8000/getPays");
        this.setState({ pays: res.data });
    }

    sendForm = async (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("name", this.state.name);
        form.append("description", this.state.description);
        form.append("stock", this.state.stock);
        form.append("price", this.state.price);
        form.append("photo", this.state.photo);
        form.append("id_vendeur", localStorage.getItem("userId"));
        form.append("id", this.state.id)
        await Axios.post("http://localhost:8000/modifyArticle", form);
        window.location = "http://localhost:3000/maBoutique";
    }

    modifySale = async (e) => {
        const res = await Axios.post("http://localhost:8000/modifySale", {
            id: this.state.id,
            pourcentage: e.target.value
        });
        if (res.data) window.location = "http://localhost:3000/maBoutique";
    }

    forbidPays = (e) => {
        console.log(this.state.pays[e.target.value]);
    }

    searchCategorie = async (e) => {
        if (e.target.value.length > 0) {
            const res = await Axios.post("http://localhost:8000/searchCategorie", { search: e.target.value });
            this.setState({ categoriesResult: res.data });
        }
    }

    addCategorie = async (e) => {
        const body = {
            idCategorie: parseInt(e.target.getAttribute("value")),
            id: this.state.id
        };
        await Axios.post("http://localhost:8000/addCategorie", body);
        this.refreshCategorie();
    }

    deleteCategorie = async (e) => {
        const body = {
            idCategorie: parseInt(e.target.getAttribute("value")),
            id: this.state.id
        };
        await Axios.post("http://localhost:8000/deleteCategorie", body);
        this.refreshCategorie();
    }

    refreshCategorie = async () => {
        const res = await Axios.post("http://localhost:8000/articleCategorie", { id: this.state.id });
        this.setState({ categories: res.data });
        console.log(res.data)
    }

    render() {
        return (
            <Container className="mon-compte-padding">
                <p className="mon-compte-p">Modifier votre article :</p>
                <Form>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <Form.Control required placeholder="Nom de l'article"
                                        onChange={(e) => this.setState({ name: e.target.value })} />
                                </Col>
                                <Col>
                                    <Form.Control required type={"number"} placeholder="Prix"
                                        onChange={(e) => this.setState({ price: e.target.value })} />
                                </Col>
                            </Row>
                            <Form.Control required style={{ marginTop: "20px" }} as="textarea" rows="3"
                                onChange={(e) => this.setState({ description: e.target.value })} />
                            <Row style={{ marginTop: "20px" }}>
                                <Col>
                                    <Form.Control required type={"number"} placeholder="Stock"
                                        onChange={(e) => this.setState({ stock: e.target.value })} />
                                </Col>
                                <Col>
                                    <Form.File required name="Photo" label="Photo"
                                        onChange={(e) => this.setState({ photo: e.target.files[0] })} />
                                </Col>
                                <Col>
                                    <Button type={"submit"} variant={"ecommerce3"} onClick={this.sendForm}>
                                        Valider
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    Pourcentage de reduction:
                                </Col>
                                <Col>
                                    <Form.Control as="select" onChange={(e) => this.modifySale(e)} custom>
                                        <option>Choisissez le pourcentage de reduction</option>
                                        {
                                            this.state.pourcent.map((x, i) => (
                                                <option value={i}>{`${i}%`}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col>
                                    Interdire un pays:
                                </Col>
                                <Col>
                                    <Form.Control onChange={(e) => this.forbidPays(e)} as="select" custom>
                                        <option>Choisissez un pays a interdire</option>
                                        {
                                            this.state.pays.map((x, i) => (
                                                <option value={i}>{`${x.pays}`}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
                <hr />
                <Row>
                    <Col>
                        <p className="mon-compte-p">Ajouter une categorie au produit:</p>
                        <FormControl type="text" onChange={this.searchCategorie} placeholder="Recherchez un objet"
                            className="mr-sm-2" />
                        <Row>
                            {this.state.categoriesResult.map((x, i) => (
                                <h4 style={{ paddingLeft: "6px", cursor: "pointer" }} onClick={this.addCategorie}>
                                    <Badge variant="ecommerce4" value={x.id}>
                                        {x.name}
                                    </Badge>{' '}
                                </h4>))}
                        </Row>
                    </Col>
                    <Col>
                        <p className="mon-compte-p">Supprimer une categorie au produit:</p>
                        <Row>
                            {this.state.categories.map((x, i) => (
                                <h4 style={{ paddingLeft: "6px", cursor: "pointer" }} onClick={this.deleteCategorie}>
                                    <Badge variant="ecommerce4" value={x.id}>
                                        {x.name}
                                    </Badge>{' '}
                                </h4>))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}