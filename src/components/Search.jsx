import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Axios from "axios";

export default function Search() {
    const {search} = useParams();
    const [result, setResult] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:8000/search", {search: search})
            .then(res => setResult(res.data));
    });

    return (
        <Container>
            <Row>
                {
                    result.map((x, i) => (
                        <>
                            <Col lg={4} sm={12} md={6}>
                                <Card key={i}>
                                    <Card.Img style={{cursor: "pointer"}} variant="top"
                                              src={`http://localhost:8000${x.photo}`}/>
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
                                                <Link to={`/article/${x.id}`}>
                                                    <Button value={i} variant={"ecommerce3"}>
                                                        Details
                                                    </Button>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                                <br/>
                            </Col>
                        </>
                    ))
                }
            </Row>
        </Container>
    );
}