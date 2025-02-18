import useAuthStore from '@/store/authStore'
import useModalRequireLoginStore from '@/store/modalStore'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModelRequireLogin = () => {
  const { show, setShowModalRequireLogin } = useModalRequireLoginStore()
  const handleClose = () => {
    setShowModalRequireLogin(false)
  }

  const { initLogin } = useAuthStore()

  const handleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await initLogin()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Requirement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You need to login if you want to access this feature
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAuth}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModelRequireLogin
