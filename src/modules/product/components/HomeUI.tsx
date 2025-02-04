import { useQueries, useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import image1 from '../../../../public/layout_web__1015x325.webp'
import image2 from '../../../../public/layout_web__1015x325_ghe_ha_gia.webp'
import { Product, ProductData } from '../models'
import { getProductAPI, getSuggestedProductAPI } from '../services'
import CustomCard from './CustomCard'
import Footer from './Footer'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import SubHeader from './SubHeader'
import SwipeToSlide from './SwipeToSlice'
import { queryObjects } from 'v8'

const PAGE_NO = 1
const PAGE_SIZE = 20

const HomeUI: FC = () => {
  const [laptopGamingData, setLaptopGamingData] = useState<ProductData>()

  const [mouseData, setMouseData] = useState<ProductData>()

  const [keyboardData, setKeyBoardData] = useState<ProductData>()

  const [monitorData, setMonitorData] = useState<ProductData>()

  const { data: suggestedSlug, isLoading } = useQuery({
    queryKey: ['suggestedSlug'],
    queryFn: getSuggestedProductAPI
  })

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

  const isLoadingProducts = ProductQueries.some((item) => item.isLoading)

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
            <img src={image1} alt="" />
            <img src={image2} alt="" />
          </div>
          {successfulProducts.map((data) => {
            return renderSection(data.content[0].category, data)
          })}
        </Container>
      )}

      <Footer />
    </>
  )
}

export default HomeUI
