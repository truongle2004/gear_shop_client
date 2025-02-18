import useAuthStore from '@/store/authStore'
import { formatPriceVND } from '@/utils/formatPrice'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { getCartByUserIdAPI } from '../services'

const CartUI = () => {
  // TODO: need to consider here
  const {
    getUserId,
    userInfo: { id }
  } = useAuthStore()
  const [quantity, setQuantity] = useState(1)

  // getUserId()

  const { data: cartData } = useQuery({
    queryKey: ['cart', id],
    queryFn: () => getCartByUserIdAPI(id as string),
    enabled: !!id
  })

  console.log(id)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  useEffect(() => {
    const fetchUserInfor = async () => {
      await getUserId()
    }
    try {
      fetchUserInfor()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <aside className="col-lg-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th>title</th>
                      <th
                        scope="col"
                        style={{
                          width: '120px'
                        }}
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        style={{
                          width: '120px'
                        }}
                      >
                        Price
                      </th>
                      <th className="w-5"></th>
                    </tr>
                  </thead>

                  {cartData?.cartItems.map((item) => (
                    <tbody key={item.id}>
                      <tr>
                        <figure className="itemside align-items-center">
                          <div className="aside">
                            <img
                              src={item.product.images[0].src}
                              className="img-sm"
                              style={{
                                width: '90px',
                                height: '90px'
                              }}
                              alt={
                                item.product.images[0].alt || item.product.title
                              }
                            />
                          </div>
                        </figure>
                        <td
                          style={{
                            width: '200px'
                          }}
                        >
                          {item?.product.title}
                        </td>
                        <td className="w-25">
                          <td className="text-center d-flex gap-3">
                            <Button onClick={handleIncrement}>+</Button>
                            <p>{quantity}</p>
                            <Button onClick={handleDecrement}>-</Button>
                          </td>
                        </td>
                        <td>
                          <div className="price-wrap">
                            <var className="price">
                              {formatPriceVND(item.product.price as number)}{' '}
                              each
                            </var>
                          </div>
                        </td>
                        <td className="text-right d-none d-md-block">
                          <button className="btn btn-light"> Remove </button>
                        </td>
                        <td>
                          <Form>
                            <Form.Check />
                          </Form>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
            {cartData?.cartItems.length === 0 && (
              <div className="alert alert-info text-center mt-3" role="alert">
                Your cart is empty
              </div>
            )}
          </aside>
          <aside className="col-lg-3">
            <div className="card mb-3">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    {' '}
                    <label>Have coupon?</label>
                    <div className="input-group">
                      {' '}
                      <input
                        type="text"
                        className="form-control coupon"
                        name=""
                        placeholder="Coupon code"
                      />{' '}
                      <span className="input-group-append">
                        {' '}
                        <button className="btn btn-primary btn-apply coupon">
                          Apply
                        </button>{' '}
                      </span>{' '}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <dl className="dlist-align">
                  <dt>Total price:</dt>
                  <dd className="text-right ml-3">
                    {formatPriceVND(cartData?.totalPrice as number)}
                  </dd>
                </dl>
                <dl className="dlist-align">
                  <dt>Discount:</dt>
                  <dd className="text-right text-danger ml-3">- $10.00</dd>
                </dl>
                <dl className="dlist-align">
                  <dt>Total:</dt>
                  <dd className="text-right text-dark b ml-3">
                    <strong>$59.97</strong>
                  </dd>
                </dl>
                <hr />{' '}
                <a
                  href="#"
                  className="btn btn-out btn-primary btn-square btn-main"
                  data-abc="true"
                >
                  {' '}
                  Make Purchase{' '}
                </a>{' '}
                <a
                  href="#"
                  className="btn btn-out btn-success btn-square btn-main mt-2"
                  data-abc="true"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default CartUI
