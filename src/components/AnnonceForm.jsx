import React from "react";
import {Container, Form, Row, Col, Button} from "react-bootstrap";
import Axios from "axios";

export default class AnnonceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null,
            name: null,
            stock: null,
            price: null,
            photo: null
        }
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
        const response = await Axios.post("http://localhost:8000/postArticle", form);
        window.location = "http://localhost:3000/maBoutique";
    }

    render() {
        return (
            <Container style={{marginTop: "20px"}}>
                <Form>
                    <Row>
                        <Col>
                            <Form.Control required placeholder="Nom de l'article"
                                          onChange={val => this.setState({name: val.target.value})}/>
                        </Col>
                        <Col>
                            <Form.Control required type={"number"} placeholder="Prix"
                                          onChange={val => this.setState({price: val.target.value})}/>
                        </Col>
                    </Row>
                    <Form.Control required style={{marginTop: "20px"}} as="textarea" rows="3"
                                  onChange={val => this.setState({description: val.target.value})}/>
                    <Row style={{marginTop: "20px"}}>
                        <Col>
                            <Form.Control required type={"number"} placeholder="Stock"
                                          onChange={val => this.setState({stock: val.target.value})}/>
                        </Col>
                        <Col>
                            <Form.File required name="Photo" label="Photo"
                                       onChange={val => this.setState({photo: val.target.files[0]})}/>
                        </Col>
                        <Col>
                            <Button type={"submit"} variant={"ecommerce3"} onClick={this.sendForm}>
                                Valider
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}