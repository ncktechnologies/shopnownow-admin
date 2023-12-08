import { Col, Row } from 'antd'

export function RowDetails({ label, value = 'value' }) {
  return (
    <>
      <Row style={{ gap: '1rem' }} className='rows py-2'>
        <Col sm={8} md={6}>
          <p className='m-0 pl-2'>{label}</p>
        </Col>
        <Col sm={12} md={12}>
          <p className='m-0'>{value}</p>
        </Col>
      </Row>
      <hr className='w-100 divider' />
    </>
  )
}
