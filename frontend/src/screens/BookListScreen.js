import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBooks, deleteBook } from '../actions/bookActions'
import { useNavigate } from 'react-router-dom';

const BookListScreen = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const bookList = useSelector((state) => state.bookList)
  const { loading, error, books } = bookList

  const bookDelete = useSelector((state) => state.bookDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBooks())
    } else {
        navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBook(id))
    }
  }

  const createBookHandler = (book) => {
    //   CREATE Book
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Books</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createBookHandler}>
            <i className='fas fa-plus'></i> Create Book
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.name}</td>
                <td>${book.price}</td>
                <td>{book.genre}</td>
                <td>{book.publisher}</td>
                <td>
                  <LinkContainer to={`/admin/book/${book._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(book._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default BookListScreen