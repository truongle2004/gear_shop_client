import { useMutation } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ProductData } from '../models'
import { getKeyBoardAPI, getLaptopGamingAPI, getPCAPI } from '../services'
import CustomCard from './CustomCard'
import SubHeader from './SubHeader'
import SwipeToSlide from './SwipeToSlice'

const HomeUI: FC = () => {
  const [laptopGamingData, setLaptopGamingData] = useState<ProductData>()

  const [mouseData, setMouseData] = useState<ProductData>()

  const [keyboardData, setKeyBoardData] = useState<ProductData>()

  const { mutate: getKeyBoardMutation } = useMutation({
    mutationFn: getKeyBoardAPI,
    onSuccess: (data) => {
      setKeyBoardData(data)
    }
  })

  const { mutate: getLaptopMutation } = useMutation({
    mutationFn: getLaptopGamingAPI,
    onSuccess: (data) => {
      setLaptopGamingData(data)
    }
  })

  const { mutate: getPcMutation } = useMutation({
    mutationFn: getPCAPI,
    onSuccess: (data) => {
      setMouseData(data)
    }
  })

  useEffect(() => {
    getLaptopMutation({
      pageNo: 1,
      pageSize: 10
    })

    getPcMutation({
      pageNo: 1,
      pageSize: 10
    })

    getKeyBoardMutation({
      pageNo: 1,
      pageSize: 10
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
        <Link to={`/category/${title.toLowerCase()}`}>Xem them</Link>
      </div>

      <SwipeToSlide>
        {data?.content.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.handle}`}
            className="link-no-decoration"
          >
            <CustomCard {...item} />
          </Link>
        ))}
      </SwipeToSlide>
    </section>
  )

  return (
    <>
      <SubHeader />
      <Container>
        {renderSection('Laptop Gaming', laptopGamingData)}
        {renderSection('Chuot', mouseData)}
        {renderSection('Ban Phim', keyboardData)}
      </Container>
    </>
  )
}

export default HomeUI
