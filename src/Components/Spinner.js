import { Image } from "react-bootstrap";
import spinner from "../assets/spinner.gif";
function Spinner() {
  return <Image className="spinner" src={spinner} alt="spinner" />;
}
export default Spinner;
