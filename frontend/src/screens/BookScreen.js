import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBookDetails } from '../actions/bookActions';

const BookScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;

  useEffect(() => {
    dispatch(listBookDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={book.image} alt={book.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{book.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={book.rating}
                  text={`${book.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${book.price}</ListGroup.Item>
              <ListGroup.Item>Description: {book.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${book.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {book.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={book.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BookScreen;
