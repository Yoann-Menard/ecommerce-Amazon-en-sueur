import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";

export default class CategorieForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null,
            name: null
        }
    }

    sendForm = async (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("name", this.state.name);
        form.append("description", this.state.description);
        form.append("id_vendeur", localStorage.getItem("userId"));
        await Axios.post("http://localhost:8000/postCategorie", form);
        window.location = "http://localhost:3000/maBoutique";
    }

    render() {
        return (
            <Container style={{ marginTop: "20px" }}>
                <Form>
                    <Row>
                        <Col>
                            <Form.Control required placeholder="Nom de la categorie"
                                onChange={val => this.setState({ name: val.target.value })} />
                        </Col>
                    </Row>
                    <Form.Control required style={{ marginTop: "20px" }} as="textarea" rows="3"
                        onChange={val => this.setState({ description: val.target.value })} />
                    <Row style={{ marginTop: "20px" }}>
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
