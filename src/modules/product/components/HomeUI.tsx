import { useMutation } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import image1 from '../../../../public/layout_web__1015x325.webp'
import image2 from '../../../../public/layout_web__1015x325_ghe_ha_gia.webp'
import { ProductData } from '../models'
import { getProductAPI } from '../services'
import CustomCard from './CustomCard'
import SubHeader from './SubHeader'
import SwipeToSlide from './SwipeToSlice'
import ScrollToTopOnMount from './ScrollToTopOnMount'

const PAGE_NO = 1
const PAGE_SIZE = 20

const HomeUI: FC = () => {
  const [laptopGamingData, setLaptopGamingData] = useState<ProductData>()

  const [mouseData, setMouseData] = useState<ProductData>()

  const [keyboardData, setKeyBoardData] = useState<ProductData>()

  const [monitorData, setMonitorData] = useState<ProductData>()

  const { mutate: getKeyBoardMutation } = useMutation({
    mutationFn: getProductAPI,
    onSuccess: (data) => {
      setKeyBoardData(data)
    }
  })

  const { mutate: getLaptopMutation } = useMutation({
    mutationFn: getProductAPI,
    onSuccess: (data) => {
      setLaptopGamingData(data)
    }
  })

  const { mutate: getMouseMutation } = useMutation({
    mutationFn: getProductAPI,
    onSuccess: (data) => {
      setMouseData(data)
    }
  })

  const { mutate: getMonitorMutation } = useMutation({
    mutationFn: getProductAPI,
    onSuccess: (data) => {
      setMonitorData(data)
    }
  })

  useEffect(() => {
    getLaptopMutation({
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      slug: 'laptop-gaming'
    })

    getMouseMutation({
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      slug: 'chuot'
    })

    getKeyBoardMutation({
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      slug: 'ban-phim'
    })

    getMonitorMutation({
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      slug: 'man-hinh'
    })
  }, [])

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
      <Container>
        <div>
          <img src={image1} alt="" />
          <img src={image2} alt="" />
        </div>
        {renderSection('Laptop Gaming', laptopGamingData)}
        {renderSection('Chuot', mouseData)}
        {renderSection('Ban Phim', keyboardData)}
        {renderSection('Man Hinh', monitorData)}
      </Container>
    </>
  )
}

export default HomeUI
