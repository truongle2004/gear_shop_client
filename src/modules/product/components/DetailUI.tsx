import useAuthStore from '@/store/authStore'
import useCategoryStore from '@/store/categoryStore'
import { formatPriceVND } from '@/utils/formatPrice'
import { scrollToTop } from '@/utils/scrollToTop'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { FaStar } from 'react-icons/fa'
// import Ratings from 'react-ratings-declarative'
import { ToastifySuccess } from '@/utils/Toastify'
import { Link, useParams } from 'react-router-dom'
import {
  addProductToCartAPI,
  getProductAPI,
  getProductDetailByIdAPI
} from '../services'

const DEFAULT_PAGE_NO = 1
const DEFAULT_PAGE_SIZE = 20

// TODO: add reviews
const DetailUI = () => {
  const { productId } = useParams()
  const [imageIndex, setImageIndex] = useState(0)
  const { listCategory } = useCategoryStore()
  const [quantity, setQuantity] = useState(1)
  const {
    getUserId,
    userInfo: { id }
  } = useAuthStore()

  // call api get detail product by id
  const { data: detailData } = useQuery({
    queryKey: ['detail', productId],
    queryFn: () => getProductDetailByIdAPI({ id: Number(productId) }),
    // this query will only run when id is not null
    enabled: !!productId
  })

  // after call product detail success, get more recommend product by category slug
  const productCategorySlug = listCategory
    .filter((item) => item.name === detailData?.category)
    .at(0)?.slug

  // call api get more recommend product
  const { data: products } = useQuery({
    queryKey: [
      'products',
      // set params for get more recommend product
      DEFAULT_PAGE_NO,
      DEFAULT_PAGE_SIZE,
      productCategorySlug
    ],
    queryFn: () =>
      getProductAPI({
        pageNo: DEFAULT_PAGE_NO,
        pageSize: DEFAULT_PAGE_SIZE,
        slug: productCategorySlug as string
      }),
    // this query will only run when productCategorySlug is not null
    enabled: !!productCategorySlug
  })

  const { mutateAsync: addProductToCartMutation } = useMutation({
    mutationFn: addProductToCartAPI,
    onSuccess: (data) => {
      ToastifySuccess(data.message)
    }
  })

  const handleClickAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleAddToCart()
  }

  const handleAddToCart = async () => {
    try {
      if (id) {
        await addProductToCartMutation({
          productId: Number(productId),
          quantity,
          userId: id as string
        })
      } else {
        // handle user id is null
        await getUserId()
      }
    } catch (err) {
      console.log('err', err)
    }
  }

  const reduceQuantity = () => {
    if (quantity == 1) return
    setQuantity((prev) => prev - 1)
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  useEffect(() => {
    // each time refresh page, scroll to top
    scrollToTop()
  }, [productId])

  const clickImage = (index: number) => {
    setImageIndex(index)
  }

  // TODO: need to handle display when there is no description
  return (
    <>
      {/* <ModelRequireLogin /> */}
      <div
        className="container mt-5 py-4 px-xl-5"
        style={{
          width: '80%'
        }}
      >
        <div className="row mb-4">
          <div className="d-none d-lg-block col-lg-1">
            <div
              className="image-vertical-scroller"
              style={{
                maxHeight: '500px',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              <div className="d-flex flex-column">
                {detailData?.images.map((image) => (
                  <img
                    key={image.id}
                    className={`cover rounded mb-2 ${imageIndex === image.position - 1 ? 'border border-primary' : ''}`}
                    width="40"
                    height="40"
                    onClick={() => clickImage(image.position - 1)}
                    style={{
                      objectFit: 'cover'
                    }}
                    alt={image.alt}
                    src={image.src}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12 mb-4">
                <img
                  className="cover rounded"
                  width="100%"
                  height="100%"
                  alt=""
                  src={detailData?.images[imageIndex].src}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="d-flex flex-column h-100">
              <h2 className="mb-1">{detailData?.title}</h2>

              <h4 className="text-danger">
                <strong>{formatPriceVND(detailData?.price as number)}</strong>
              </h4>

              <div className="row g-3 mb-4">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-outline-dark py-2 w-100"
                    onClick={handleClickAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-dark py-2 w-100">Buy now</button>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button
                  className="btn btn-primary"
                  size="sm"
                  onClick={reduceQuantity}
                  aria-label="Decrease quantity"
                >
                  -
                </Button>
                <p className="m-0 fw-bold">{quantity}</p>
                <Button
                  className="btn btn-primary"
                  size="sm"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>

              <h4 className="mb-0">Details</h4>
              <hr />
              <dl className="row">
                <dt className="col-sm-4">Category</dt>
                <dd className="col-sm-8 mb-3">{detailData?.category}</dd>

                <dt className="col-sm-4">Brand</dt>
                <dd className="col-sm-8 mb-3">{detailData?.vendor}</dd>

                <dt className="col-sm-4">Status</dt>
                <dd className="col-sm-8 mb-3">
                  {detailData?.available ? 'In stock' : 'Out of stock'}
                </dd>

                <dt className="col-sm-4">Rating</dt>
                <dd className="col-sm-8 mb-3">
                  {/* <Ratings
                    rating={4.5}
                    widgetRatedColors="rgb(253, 204, 13)"
                    widgetSpacings="2px"
                  >
                    {Array.from({ length: 5 }, (_, i) => {
                      return (
                        <Ratings.Widget
                          key={i}
                          widgetDimension="20px"
                          svgIconViewBox="0 0 19 20"
                          svgIconPath={iconPath}
                          widgetHoverColor="rgb(253, 204, 13)"
                        />
                      )
                    })}
                  </Ratings> */}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          {detailData?.description && (
            <section
              style={{
                width: '70%'
              }}
            >
              <h4 className="mb-0 text-center">Description</h4>
              <hr />
              <div className="bg-light">
                <p
                  className="lead link-no-decoration"
                  style={{ whiteSpace: 'pre-wrap', padding: '10px 20px' }}
                  dangerouslySetInnerHTML={{
                    __html: detailData?.description as string
                  }}
                ></p>
              </div>
            </section>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <section>
              <h5>Có thể bạn quan tâm</h5>
              <div>
                {products?.content?.map((item, index) => {
                  if (!item) return null
                  if (index < 6)
                    return (
                      <Link
                        to={`/tech_shop/pages/product/${item.slug}/${item.id}`}
                        className="link-no-decoration"
                        key={item?.id}
                      >
                        <div
                          className="d-flex gap-3 m-2"
                          style={{
                            cursor: 'pointer'
                          }}
                        >
                          <img
                            style={{
                              objectFit: 'contain',
                              width: '100px'
                            }}
                            src={item?.images[0].src}
                            alt={item?.images[0].alt}
                          />

                          <div>
                            <p
                              style={{
                                fontSize: '10px'
                              }}
                            >
                              {item?.title}
                            </p>
                            <p className="text-danger">
                              <strong>{formatPriceVND(item?.price)}</strong>
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                })}
              </div>
            </section>
          </div>
        </div>

        <section>
          <h4 className="mb-0">Đánh giá & Nhận xét {detailData?.title}</h4>
          <div className="d-flex justify-content-center">
            <div className="content text-center">
              <div className="ratings">
                <span className="product-rating">4.6</span>
                <span>/5</span>
                <div className="stars">
                  <FaStar color="#FFD700" />
                  <FaStar color="#FFD700" />
                  <FaStar color="#FFD700" />
                  <FaStar color="#FFD700" />
                </div>

                <div className="rating-text">
                  <span>46 ratings & 15 reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default DetailUI
