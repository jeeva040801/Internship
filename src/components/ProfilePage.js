import { useLocation } from 'react-router-dom';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Profile-page.css';

function Cards({ name, role, about }) {
  return (
    <div className="card" style={{ border: '1px solid black',borderRadius:'20px', margin: '10px', padding: '10px', position: 'absolute', top: '0', left: '0', background: 'linear-gradient(to top, green , yellow)' }}>
      <h2>{name}</h2>
      <h3>{role}</h3>
      <p>{about}</p>
    </div>
  );
}
function GridExample({ cardData }) {
  return (
    <Row>
      {cardData.map((data, index) => (
        <Col sm={12} md={6} key={index}>
          <Card>
            <Card.Body>
              <Card.Title>
                {data.title}
              </Card.Title>
              <Card.Text>
                {data.text}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

function ProfilePage() {
  const location = useLocation();
  const profile = location.state;

  if (!profile) {
    return <div>No profile data</div>; // or some fallback UI
  }
  let cardData;
  if (profile.role === 'Writer') {
    cardData = [
      { title: 'Short Film', text: 'Wrote the screenplay for a short film which got screened in many film festivals' },
      { title: 'Tv Ads', text: 'Wrote a Tv Ad for Paytm, Cred and many more' },
      { title: 'Novels', text: 'Author of four best selling books in India ' },
      { title: 'Tv Series', text: 'Currently involved in writing screenplay for Tv Serial' },
      // Add more objects as needed
    ];
  }
  else if (profile.role === 'Developer') {
    cardData = [
      { title: 'Web Development', text: 'Developed responsive websites using HTML, CSS, and JavaScript' },
      { title: 'Mobile App Development', text: 'Built mobile applications using React Native and Flutter' },
      { title: 'Database Management', text: 'Designed and implemented efficient database structures' },
      { title: 'API Integration', text: 'Integrated third-party APIs for enhanced functionality' },
      
      // Add more objects as needed
    ];
  }
  else if (profile.role === 'Artist') {
    cardData = [
      { title: 'Paintings', text: 'Created beautiful paintings exhibited in art galleries' },
      { title: 'Sculptures', text: 'Designed and crafted unique sculptures using various materials' },
      { title: 'Installations', text: 'Created immersive art installations for public spaces' },
      { title: 'Digital Art', text: 'Produced digital artworks using innovative techniques' },
      // Add more objects as needed
    ];
  }
   
  else if (profile.role === 'Lawyer') {
    cardData = [
      { title: 'Legal Consultation', text: 'Provided expert legal advice and consultation to clients' },
      { title: 'Court Representation', text: 'Represented clients in court proceedings and trials' },
      { title: 'Contract Drafting', text: 'Drafted and reviewed legal contracts and agreements' },
      { title: 'Negotiation', text: 'Negotiated settlements and agreements on behalf of clients' },
      // Add more objects as needed
    ];
  }
  return (
    <>
      <Cards name={profile.name} role={profile.role} about={profile.about} />
      <GridExample cardData={cardData} />
      
    </>
  );
}

export default ProfilePage;





/*
function GridExample({cardTexts}) {
  return (
    <>
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            {idx === 0 && <Card.Img variant="top"/>}
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
}

function ProfilePage() {
  const location = useLocation();
  const profile = location.state;

  if (!profile) {
    return <div>No profile data</div>; // or some fallback UI
  }

  return (
    <>
      <Cards name={profile.name} role={profile.role} about={profile.about} />
      <GridExample />
    </>
  );
}

*/