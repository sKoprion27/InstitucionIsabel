import { Card, CardTitle, Col, Icon, Row } from 'react-materialize'
import { Link } from 'react-router-dom'
import { NavPage } from '../../Components/Dashboard/NavPage'
import { mockHome } from '../../mock/home.mock'

export const Home = () => {
  return (
    <>
      <NavPage title='Inicio' onePage />
      <Row>
        {
          mockHome.map(item => {
            return (
              <Col
                key={item.id}
                m={4}
                s={12}
              >
                <Card
                  closeIcon={<Icon>close</Icon>}
                  header={
                    <CardTitle
                      image={item.image}
                      reveal
                      waves='light'
                    />
                  }
                  reveal={<p>{item.description}</p>}
                  revealIcon={<Icon>more_vert</Icon>}
                  title={item.title}
                >
                  <p>
                    <Link to={item.link.url}>
                      {item.link.text}
                    </Link>
                  </p>
                </Card>
              </Col>)
          })
        }

      </Row>
    </>
  )
}
