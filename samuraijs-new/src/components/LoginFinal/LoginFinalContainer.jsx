import { withAuthRedirectReverse } from "../../hoc/withAuthRedirectReverse";
import LoginFinal from "./LoginFinal";

const AuthRedirectComponent = withAuthRedirectReverse(LoginFinal);

export default AuthRedirectComponent;