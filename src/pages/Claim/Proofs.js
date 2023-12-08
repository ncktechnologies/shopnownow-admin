import React from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import moment from 'moment'
export default function Proofs({ images }) {
  const proof_list =
    images &&
    images.map((proof, key) => {
      return (
        <Card key={key}>
          <Card.Img variant='top' src={proof.image} width='500' height='500' />

          <Card.Footer>
            <small className='text-muted'>
              Created at:
              {moment(proof.created_at).format('DD MMM YYYY') || ''}
            </small>
          </Card.Footer>
        </Card>
      )
    })
  return <CardGroup>{proof_list}</CardGroup>
}
