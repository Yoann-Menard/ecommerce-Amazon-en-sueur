import React from "react";
import Axios from "axios";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class Boutique extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: localStorage.getItem("userId"),
            articles: []
        };
    }

    componentDidMount() {
        this.getArticle();
    }

    getArticle = () => {
        Axios.post("http://localhost:8000/maBoutique", {id: this.state.idUser})
            .then(resp => this.setState({articles: resp.data}));
    }

    delete = (e) => {
        const res = prompt("Veuillez rentrer le nom de votre article pour confirmer la suppression!", "");
        console.log(res)
        if(res === this.state.articles[e.target.value].name)
            Axios.post("http://localhost:8000/deleteArticle", {id: this.state.articles[e.target.value].id})
            .then(resp => this.getArticle());
        else alert("Erreur");

    }

    changeTri = (e) => {
        if (e.target.value === "1") this.triCroissant();
        if (e.target.value === "2") this.triDecroissant();
        if (e.target.value === "3") this.triAlpha();
        if (e.target.value === "4") this.triAlphaInverse();
    }

    triCroissant = () => {
        let articles = this.state.articles;
        for (let i = 0; i < articles.length - 1; i++)
            for (let j = 0; j < articles.length - 1; j++)
                if (articles[j].price > articles[j + 1].price) {
                    const temp = articles[j];
                    articles[j] = articles[j + 1];
                    articles[j + 1] = temp;
                    i = 0;
                }
        this.setState({articles: articles});
    }

    triDecroissant = () => {
        let articles = this.state.articles;
        for (let i = 0; i < articles.length - 1; i++)
            for (let j = 0; j < articles.length - 1; j++)
                if (articles[j].price < articles[j + 1].price) {
                    const temp = articles[j];
                    articles[j] = articles[j + 1];
                    articles[j + 1] = temp;
                    i = 0;
                }
        this.setState({articles: articles});
    }

    triAlpha = () => {
        let articles = this.state.articles;
        articles.sort((x, y) => x.name.localeCompare(y.name));
        this.setState({articles: articles});
    }

    triAlphaInverse = () => {
        let articles = this.state.articles;
        articles.sort((x, y) => y.name.localeCompare(x.name));
        this.setState({articles: articles});
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        Trier par:
                    </Col>
                    <Col>
                        <Form.Control as="select" onChange={this.changeTri} custom>
                            <option>Choisissez un tri</option>
                            <option value={1}>Prix par ordre croissant</option>
                            <option value={2}>Prix par ordre decroissant</option>
                            <option value={3}>Prix par ordre alphabetique</option>
                            <option value={4}>Prix par ordre alphabetique inverse</option>
                        </Form.Control>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    {
                        this.state.articles.map((x, i) => (
                            <Col lg={4} sm={12} md={6}>
                                <Card key={i}>
                                    <Card.Img style={style.boutique} variant="top"
                                              src={`http://localhost:8000${x.photo}`}/>
                                    <Card.Body>
                                        {new Date().getTime() - Date.parse(x.date) < 604800000 && <h3 className={"text-ecommerce4"}>
                                            Nouveaute!
                                        </h3>}
                                        <Card.Text className="text-ecommerce1">
                                            <h3 className="text-ecommerce2">{x.name}</h3>
                                            {x.description}
                                            <Row>
                                                <Col>
                                                    <h4 className={"text-warning"}>{`${x.stock} en stocks`}</h4>
                                                </Col>
                                                <Col>
                                                    <h4 className={"text-secondary"}>{`${x.views} vues`}</h4>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Row>
                                            <Col>
                                                {x.sale === 0 && <h4>{`${x.price}€`}</h4>}
                                                {x.sale !== 0 && <>
                                                    <h4 >
                                                        <a style={{
                                                            textDecoration: "line-through",
                                                            textDecorationColor: "red"
                                                        }}>{`${x.price}€`}</a>
                                                        <a className={"text-success"}>{` -${x.sale}%`}</a>
                                                    </h4>
                                                    <h3 className={"text-success"}>
                                                        {`${x.price - (x.price  * (x.sale / 100))}€`}
                                                    </h3>
                                                </>
                                                }
                                            </Col>
                                            <Col>
                                                <Link to={`/modify/${x.id}`}>
                                                    <Button value={i} variant={"ecommerce3"}>
                                                        Modifier
                                                    </Button>
                                                </Link>
                                                <Button value={i} variant={"danger"} onClick={this.delete}>
                                                    Supprimer
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                                <br/>
                            </Col>
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