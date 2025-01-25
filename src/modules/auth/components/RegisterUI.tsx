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
  username: string
  email: string
  password: string
  confirmPassword: string
}

const schema = z
  .object({
    username: z
      .string()
      .nonempty({ message: 'Username is required' })
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(20, { message: 'Username cannot exceed 20 characters' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores'
      }),
    email: z
      .string()
      .nonempty({
        message: 'Email is required'
      })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(50, { message: 'Password cannot exceed 50 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter'
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter'
      })
      .regex(/\d/, { message: 'Password must contain at least one digit' })
      .regex(/[@$!%*?&]/, {
        message:
          'Password must contain at least one special character (@, $, !, %, *, ?, &)'
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'Confirm password is required' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

// TODO handle error response
const RegisterUI: FC = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleMovingLoginPage = () => {
    navigate('/tech_shop/pages/login')
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
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
            <h2 className="text-center mt-5">Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User name"
                  {...register('username')}
                />
                {errors?.username?.message && (
                  <p className="text-danger">{errors.username.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register('email')}
                />
                {errors?.email?.message && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                />

                {errors?.password?.message && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register('confirmPassword')}
                />

                {errors?.confirmPassword?.message && (
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>

              <div className="mt-3 d-inline-flex gap-2">
                <p>Already have an account? </p>
                <p
                  onClick={handleMovingLoginPage}
                  className="text-primary"
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  Login
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterUI
