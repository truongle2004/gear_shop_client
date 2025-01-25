import { FC, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

interface FormValues {
  email: string
  password: string
  rememberMe: boolean
}

const schema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Email is required'
    })
    .email(),
  password: z.string().nonempty({
    message: 'Password is required'
  })
})

// TODO: handle response
const LoginUI: FC = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleMovingRegisterPage = () => {
    navigate('/tech_shop/pages/register')
  }

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mt-5">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register('email')}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Remember me"
                defaultChecked={false}
                {...register('rememberMe')}
              />

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>

              <div className="d-inline-flex mt-3 gap-2">
                <p>Don't have an account? </p>
                <p
                  onClick={handleMovingRegisterPage}
                  className="text-primary"
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  Register
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginUI
