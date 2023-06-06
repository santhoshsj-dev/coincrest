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
          Coin Crest
        </a>
        <div className="right_side">
          <a
            target="_blank"
            href="https://github.com/SanthoshSJ-Dev/coincrest"
            class="github_btn"
          >
            <FaGithub size={20} color="#232323" className="github_icon" />
            <span>Source Code</span>
          </a>
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
