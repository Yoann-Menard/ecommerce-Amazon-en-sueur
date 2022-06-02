import React, { Component } from "react";
import Axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/font.css";

export default class Vendeur extends Component {

    constructor(props) {
        super(props);
        this.state = {
            membre: [],
            view: [],
            showBoutique: null,
            key: null
        };
    }

    changeShop = (e, key) => {
        this.setState({
            showBoutique: true,
            key: key
        });
    }

    componentDidMount() {
        this.getAllMembers();
        this.getAllViews();
    }

    getAllMembers = () => {
        Axios.post("http://localhost:8000/boutiques")
            .then(res => {
                this.setState({ membre: res.data });
                console.log(res.data)
            });
    }

    getAllViews = () => {
        Axios.post("http://localhost:8000/view")
            .then(res => {
                this.setState({ view: res.data })
                console.log(res.data)
            })
    }

    render() {
        return (
            <Container>
                <Row className="qwerty">
                    {
                        this.state.view && this.state.membre.map((x, i) => (
                            <>
                                <div className="test-test-un">
                                    <div className="test-test">
                                        <Col lg={4} sm={4} md={4}>
                                            <Card key={i} style={style.boutique} onClick={(e) => this.changeShop(e, i)} >
                                                <Card.Img value={i} variant="top" src={`http://localhost:8000${x.photo}`} className="test-photo" />
                                            </Card>
                                        </Col>
                                        <Col lg={7} sm={7} md={7} className="dwdwwd">
                                            <p>Nom : {x.username}</p>
                                            <p>Email : {x.email}</p>
                                            <p>Nombre de figurine :</p>
                                            <p>Nombre de vue total {x.views}:</p>
                                        </Col>
                                        <Col lg={1} sm={1} md={1}>
                                            <Link><button>Faire un devis</button></Link>
                                        </Col>
                                    </div>
                                </div>
                            </>
                        ))
                    }
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
