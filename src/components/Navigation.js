import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = (props) => {
  console.log(props.userObj);
  // 콘솔 로그 하나 남김...

  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={ faTwitter } color={ "#04AAFF" } size="2x" />
          </Link>
        </li>
        <li>
          <Link to="/profile" style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}>
            <FontAwesomeIcon icon={ faUser } color={ "04AAFF" } size="2x" />
          
          <span style={{
            marginTop: 10
          }}>
            {props.userObj.displayName ? `${props.userObj.displayName}의 Profile` : '익명의 Profile'}
          </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;