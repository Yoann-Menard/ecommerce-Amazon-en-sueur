import React from 'react';
import Axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class MostViewed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: localStorage.getItem('userId'),
      articles: [],
    };
  }

  componentDidMount() {
    this.getMostViewed();
  }

  getMostViewed = () => {
    Axios.post('http://localhost:8000/mostViewed', {
      id: this.state.idUser,
    }).then((resp) => this.setState({ articles: resp.data }));
  };

  changeTri = (e) => {
    if (e.target.value === '1') this.triCroissant();
    if (e.target.value === '2') this.triDecroissant();
    if (e.target.value === '3') this.triAlpha();
    if (e.target.value === '4') this.triAlphaInverse();
  };

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
    this.setState({ articles: articles });
  };

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
    this.setState({ articles: articles });
  };

  triAlpha = () => {
    let articles = this.state.articles;
    articles.sort((x, y) => x.name.localeCompare(y.name));
    this.setState({ articles: articles });
  };

  triAlphaInverse = () => {
    let articles = this.state.articles;
    articles.sort((x, y) => y.name.localeCompare(x.name));
    this.setState({ articles: articles });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>Trier par:</Col>
          <Col>
            <Form.Control as='select' onChange={this.changeTri} custom>
              <option>Choisissez un tri</option>
              <option value={1}>Prix par ordre croissant</option>
              <option value={2}>Prix par ordre decroissant</option>
              <option value={3}>Prix par ordre alphabetique</option>
              <option value={4}>Prix par ordre alphabetique inverse</option>
            </Form.Control>
          </Col>
        </Row>
        <hr />
        <p className='boutiques-p-padding'>
          Les articles les plus populaires :
        </p>
        <Row>
          {this.state.articles.map((x, i) => (
            <>
              <Col lg={4} sm={12} md={6}>
                <Card key={i}>
                  <Card.Img
                    style={style.boutique}
                    variant='top'
                    src={`http://localhost:8000${x.photo}`}
                  />
                  <Card.Body>
                    <Card.Text className='text-ecommerce1'>
                      <h3 className='text-ecommerce2'>{x.name}</h3>
                      {x.description}
                      <h4 className={'text-secondary'}>{`${x.views} vues`}</h4>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <Col>
                        {x.sale === 0 && <h4>{`${x.price}€`}</h4>}
                        {x.sale !== 0 && (
                          <>
                            <h4>
                              <a
                                href='/#'
                                style={{
                                  textDecoration: 'line-through',
                                  textDecorationColor: 'red',
                                }}
                              >{`${x.price}€`}</a>
                              <a href="/#" className={'text-success'}>{` -${x.sale}%`}</a>
                            </h4>
                            <h3 className={'text-success'}>
                              {`${x.price - x.price * (x.sale / 100)}€`}
                            </h3>
                          </>
                        )}
                      </Col>
                      <Col>
                        <Link to={`/article/${x.id}`}>
                          <Button value={i} variant={'ecommerce3'}>
                            Details
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
                <br />
              </Col>
            </>
          ))}
        </Row>
      </Container>
    );
  }
}

const style = {
  boutique: {
    cursor: 'pointer',
  },
};
