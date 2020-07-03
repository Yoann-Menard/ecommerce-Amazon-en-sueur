import React from "react";
import {Badge, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Axios from "axios";
import Blink from 'react-blink-text';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            options: [],
            number: 1
        }
    }

    componentDidMount() {
        this.getArticle();
    }

    getArticle = async () => {
        await this.addView();
        await Axios.post("http://localhost:8000/article", {id: window.location.href.split("/")[4]})
            .then(resp => this.setState({article: resp.data}));
        let option = [];
        for (let i = 1; i <= this.state.article[0].stock; i++)
            option.push(true);
        this.setState({options: option})
    }

    addView = async () => {
        await Axios.post("http://localhost:8000/view", {id: window.location.href.split("/")[4]});
    }

    addPanier = (e) => {
        console.log(this.state.number)
        let article = this.state.article[0];
        article.total = this.state.number;
        if(article.sale !== 0)
            article.price = article.price - (article.price  * (article.sale / 100));
        let panier = JSON.parse(localStorage.getItem("panier"));
        panier === null ? panier = [article] : panier.push(article);
        localStorage.setItem("panier", JSON.stringify(panier));
        this.props.refresh();
        window.location = "http://localhost:3000/panier";
    }

    render() {
        return (
            <Container style={{marginTop: "20px"}}>
                {
                    this.state.article.map((x, i) => (
                        <>
                            <Container key={i} bg={"light"}>
                                <Row>
                                    <Col>
                                        {x.sale !== 0 && <Blink color='#E7751F' text='En solde!' style={{fontSize: 25}}/>}
                                        <Card.Img style={style.boutique} variant="top"
                                                  src={`http://localhost:8000${x.photo}`}/>
                                        {x.categorie.map((y, j) => (<h3>
                                            <Badge variant="ecommerce4" value={y.id}>
                                                {y.name}
                                            </Badge>{' '}
                                        </h3>))}
                                    </Col>
                                    <Col>
                                        {new Date().getTime() - Date.parse(x.date) < 604800000 && <Blink color='#E7751F' text='Nouveaute!' style={{fontSize: 25}}/>}
                                        <Card.Body>
                                            <Card.Text className="text-ecommerce1">
                                                <h3 className="text-ecommerce2">{x.name}</h3>
                                                {x.description}
                                            </Card.Text>
                                            <Row>
                                                <Col>
                                                    <h4 className={"text-warning"}>{`${x.stock} en stocks`}</h4>
                                                </Col>
                                                <Col>
                                                    <h4 className={"text-secondary"}>{`${x.views} vues`}</h4>
                                                </Col>
                                            </Row>
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
                                                    <Form.Control as="select"
                                                                  onChange={(e) => this.setState({number: e.target.value})}
                                                                  custom>
                                                        {
                                                            this.state.options.map((x, i) => (
                                                                <option>{i + 1}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                    {
                                                        x.stock > 0 && <Button value={i} variant={"ecommerce3"}
                                                                               onClick={this.addPanier}>
                                                            Ajouter au panier
                                                        </Button>
                                                    }
                                                    {
                                                        x.stock === 0 && <h4 className={"text-danger"}>
                                                            En rupture de stock
                                                        </h4>
                                                    }
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                        </>
                    ))
                }
            </Container>
        );
    }
}

const style = {
    boutique: {
        cursor: "pointer"
    }
}