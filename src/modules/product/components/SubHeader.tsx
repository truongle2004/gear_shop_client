import { FC } from 'react'
import { Link } from 'react-router-dom'
import useCategoryStore from '@/store/categoryStore'

const SubHeader: FC = () => {
  const categories = useCategoryStore((state) => state.listCategory)

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
