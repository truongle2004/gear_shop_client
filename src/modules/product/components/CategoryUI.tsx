import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Container, Pagination } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ProductData } from '../models'
import { getProductAPI } from '../services'
import useCategoryStore from '../store/categoryStore'
import CustomCard from './CustomCard'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import Footer from './Footer'

const DEFAUL_PAGE_NO = 1
const DEFAUL_PAGE_SIZE = 50

// TODO: add options filter
const CategoryUI = () => {
  const { category } = useParams()
  const { listCategory } = useCategoryStore()

  const [productData, setProductData] = useState<ProductData>()

  const { mutate: fetchProductAPI } = useMutation({
    mutationFn: getProductAPI,
    onSuccess: (data) => setProductData(data)
  })

  useEffect(() => {
    if (!productData) {
      fetchProductAPI({
        pageNo: DEFAUL_PAGE_NO,
        pageSize: DEFAUL_PAGE_SIZE,
        slug: listCategory.filter((item) => item.name === category).at(0)
          ?.slug as string
      })
    }
  }, [])

  return (
    <>
      <Container>
        <ScrollToTopOnMount />
        <main
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {productData?.content.map((item) => (
            <CustomCard {...item} key={item.id} />
          ))}
        </main>
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default CategoryUI
