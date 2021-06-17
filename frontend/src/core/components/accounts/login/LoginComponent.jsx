import React, { useState } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { authService } from '../../../services/auth';

import './style.css';

export default function LoginComponent() {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('data', data);
    authService.obtainAuthToken(data).then(
      (res) => {
        console.log('response of login is', res);
        setLoading(false);
        if (res.status === 200) {
          setError(false);
          window.location.replace('/');
        } else {
          setError(true);
        }
      },
      (err) => {
        setLoading(false);
        setError(true);
      }
    );
  };
  return (
    <Container>
      <Row>
        <Col xs className="text-left pt-5">
          <Form className="loginForm" onSubmit={handleOnSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="inputField"
                name="email"
                onChange={(event) =>
                  setData({ ...data, username: event.target.value })
                }
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="inputField"
                name="password"
                onChange={(event) =>
                  setData({ ...data, password: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            {error && (
              <Form.Group>
                <span className="text-danger">
                  Could not login with given credentials.
                </span>
              </Form.Group>
            )}
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Sign in'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
