import { useMutation } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { Category } from '../models'
import { getCategoriesAPI } from '../services'
import { Link } from 'react-router-dom'

const SubHeader: FC = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const { mutate: getCategoriesMutation } = useMutation({
    mutationFn: getCategoriesAPI,
    onSuccess: (data) => {
      setCategories(data)
    }
  })

  useEffect(() => {
    if (categories?.length === 0) {
      getCategoriesMutation()
    }
  }, [])

  return (
    <nav className="subHeader">
      <ul
        style={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {categories.map((item) => (
          <li
            key={item.id}
            style={{
              listStyle: 'none',
              padding: '10px',
              cursor: 'pointer'
            }}
          >
            <Link
              className="fs-6"
              to={`/tech_shop/pages/${item.slug}`}
              style={{ textDecoration: 'none' }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SubHeader
