import { formatPriceVND } from '@/utils/formatPrice'
import { featureIcons } from '@/utils/icons'
import type { FC } from 'react'
import Card from 'react-bootstrap/Card'
import type { Product } from '../models'
import { ParsedTags } from '../types'

const CustomCard: FC<Product> = (props) => {
  const { title, tags, price, images } = props

  // Safely parse tags string into a record
  // TODO: avoid duplicating value
  const parsedData: ParsedTags = Object.fromEntries(
    tags.split(',').map((item) => {
      const [key, value] = item.split(':')
      return [key.trim(), value.trim()]
    })
  )

  return (
    <Card
      className="custom-card responsive-component"
      style={{
        width: '15rem',
        height: '420px',
        cursor: 'pointer'
      }}
    >
      <Card.Img
        variant="top"
        src={images[0]?.src || ''}
        alt={title}
        style={{ height: 'auto', objectFit: 'cover' }}
      />
      <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Card.Title
          className="fw-semibold "
          style={{
            fontSize: '0.8rem'
          }}
        >
          {title}
        </Card.Title>
        <div
          className="bg-light"
          style={{
            overflow: 'hidden'
          }}
        >
          {Object.entries(parsedData).map(([key, value]) => {
            const Icon = featureIcons[key as keyof typeof featureIcons]

            return Icon ? (
              <div
                key={key}
                className="d-inline-flex align-items-center"
                style={{
                  gap: '0.3rem',
                  marginBottom: '1px',
                  marginRight: '0.3rem'
                }}
              >
                <Icon size={11} />
                <span
                  style={{
                    fontSize: '0.5rem',
                    marginRight: '0.3rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {value}
                </span>
              </div>
            ) : null
          })}
        </div>
        <Card.Text
          className="text-danger fw-semibold mt-1"
          style={{
            fontSize: '1rem'
          }}
        >
          {formatPriceVND(price)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CustomCard
