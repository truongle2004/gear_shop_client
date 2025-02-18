import { useQueries, useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import image1 from '../../../../public/layout_web__1015x325.webp'
import image2 from '../../../../public/layout_web__1015x325_ghe_ha_gia.webp'
import { ProductData } from '../models'
import { getProductAPI, getSuggestedProductAPI } from '../services'
import CustomCard from './CustomCard'
import Footer from './Footer'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import SubHeader from './SubHeader'
import SwipeToSlide from './SwipeToSlice'

const PAGE_NO = 1
const PAGE_SIZE = 20

const HomeUI: FC = () => {
  // call api get suggested product slug
  const { data: suggestedSlug, isLoading } = useQuery({
    queryKey: ['suggestedSlug'],
    queryFn: getSuggestedProductAPI
  })

  // after it get suggested product, call api to get by certain slug
  const ProductQueries = useQueries({
    queries:
      !isLoading && Array.isArray(suggestedSlug)
        ? suggestedSlug?.map((item) => ({
            queryKey: [item],
            queryFn: () =>
              getProductAPI({
                pageNo: PAGE_NO,
                pageSize: PAGE_SIZE,
                slug: item
              })
          }))
        : []
  })

  // check if there is any query is loading
  const isLoadingProducts = ProductQueries.some((item) => item.isLoading)

  // only get the successful queries
  const successfulProducts = ProductQueries.filter(
    (query) => query.isSuccess && query.data
  ).map((query) => query.data as ProductData)

  const renderSection = (title: string, data: ProductData | undefined) => (
    <section>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '3px'
        }}
      >
        <h3 className="fw-bold">{title}</h3>
        <Link to={`/tech_shop/pages/category/${data?.content[0].category}`}>
          Xem them
        </Link>
      </div>

      <SwipeToSlide>
        {data?.content.map((item) => <CustomCard {...item} key={item.id} />)}
      </SwipeToSlide>
    </section>
  )

  return (
    <>
      <SubHeader />
      <ScrollToTopOnMount />
      {isLoadingProducts && <div>Loading...</div>}
      {!isLoadingProducts && (
        <Container>
          <div>
            <img src={image1} alt="img1" />
            <img src={image2} alt="img2" />
          </div>
          {successfulProducts.map((data) => (
            <div key={data.content[0].category}>
              {renderSection(data.content[0].category, data)}
            </div>
          ))}
        </Container>
      )}

      <Footer />
    </>
  )
}

export default HomeUI
