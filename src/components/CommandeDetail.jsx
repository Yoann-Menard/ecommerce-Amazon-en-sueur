import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Axios from "axios";

export default function CommandeDetail() {
    const { id } = useParams();
    const [commande, setCommande] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:8000/commandeDetail", { id: id })
            .then(res => {
                setCommande(res.data);
                console.log(res.data);
            });
    }, [id]);

    return (
        <>
            {commande.map((x, i) => (
                <Container key={i} style={{ marginBottom: "100px" }}>
                    <Button className={"d-print-none"} variant={"ecommerce4"} onClick={(e) => window.print()}>
                        Imprimer une Facture
                    </Button>
                    <hr />
                    <Row>
                        <Col >
                            <Card.Img variant="top" src={`http://localhost:8000${x.detailArticle.photo}`} />
                            <h3>{`Article: ${x.detailArticle.name}`}</h3>
                            <h3>{`Prix: ${x.total}€`}</h3>
                            <h3>{`Nombre d'article: ${x.nombre_article}`}</h3>
                        </Col>
                        <Col>
                            <Row style={{ marginTop: "20px" }}>
                                <Col className={"text-ecommerce2"} style={{ borderRight: "1px solid grey" }}>
                                    <h3>{`Nom: ${x.nom}`}</h3>
                                    <h3>{`Prenom: ${x.prenom}`}</h3>
                                </Col>
                                <Col className={"text-ecommerce2"}>
                                    <h3>{`Adresse: ${x.adresse}`}</h3>
                                    <h3>{`Ville: ${x.ville}`}</h3>
                                    <h3>{`Code postal: ${x.code_postal}`}</h3>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col className={"text-ecommerce2"} style={{ borderRight: "1px solid grey" }}>
                                    <h3>{`Date: ${new Date(Date.parse(x.date)).toString()}`}</h3>
                                </Col>
                                <Col className={"text-ecommerce2"}>
                                    <h3>{`Statut:`}</h3>
                                    <h3 className={"text-success"}>{x.statut}</h3>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            ))}
        </>
    );
}