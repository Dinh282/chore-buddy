import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link} from 'react-router-dom';
import { Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

function Error() {
  return (
    <>
      <Header />
      <Row justify="center" align="middle" style={{ minHeight: '60vh' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title>Sorry, page not found.</Title>
          <Paragraph>
            Go to <Link to='/' style={{
              textDecoration: 'underline'
            }}>homepage</Link>.
          </Paragraph>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default Error