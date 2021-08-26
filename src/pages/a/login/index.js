import { memo } from "react";
import SEO from '../../../components/seo'

const Login = memo(() => {
  return (
    <>
      <SEO title="Sign in" />
      <h1>Login page</h1>
    </>
  );
});


Login.displayName = Login;
export default Login;
