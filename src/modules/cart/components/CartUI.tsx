// TODO: call api to get user cart

import useAuth from '@/hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { getCartAPI } from '../services'
import { useEffect } from 'react'

// TODO: user should login before accessing cart
const CartUI = () => {
  // TODO: need to consider here
  const [isLogin, token] = useAuth()

  const { mutate: fetchCartAPI } = useMutation({
    mutationFn: getCartAPI,
    onSuccess: (data) => console.log(data)
  })

  useEffect(() => {
    fetchCartAPI()
  }, [])

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
                      <th
                        scope="col"
                        className="text-right d-none d-md-block "
                        style={{
                          width: '200px'
                        }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
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
                  <dd className="text-right ml-3">$69.97</dd>
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
