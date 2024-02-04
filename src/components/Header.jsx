import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { FaGithub } from "react-icons/fa";

function Header() {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();

  return (
    <header>
      <nav className="nav">
        <a onClick={() => navigate(`/`)} className="logo">
          Crypto Hub
        </a>
        <div className="right_side">
          <select
            className="currency_select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value={"INR"}>INR</option>
            <option value={"USD"}>USD</option>
            <option value={"NGN"}>NGN</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

export default Header;
