import { Link } from "react-router-dom";

function Home() {
    return (

<div className="container">
  <h1 className="text-center my-4">Bienvenue dans l'application de filtrage de CV</h1>
  <ul className="list-group">
    <li className="list-group-item"><Link to="/upload">Déposer un CV</Link></li>
    <li className="list-group-item"><Link to="/chatbot">Poser une question au Chatbot</Link></li>
    <li className="list-group-item"><Link to="/follow-up">Suivi de candidature</Link></li>
  </ul>
</div>
    );
  }
export default Home;   
  