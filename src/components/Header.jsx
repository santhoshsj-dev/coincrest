import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

function Header() {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();

  return (
    <header>
      <nav className="nav">
        <a onClick={() => navigate(`/`)} className="logo">
          Coin Crest
        </a>
        <div>
          <a
            href="https://github.com/SanthoshSJ-Dev/coincrest"
            class="github_btn"
          >
            <span>Source Code</span>
          </a>
          <select
            className="currency_select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value={"USD"}>USD</option>
            <option value={"INR"}>INR</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

export default Header;
