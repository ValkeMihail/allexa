import { useState } from "react";
import {
  getMultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../App.css"
function Login() {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [resolver, setResolver] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const handleSignIn = (email, password) => {
    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container-id", undefined, auth);

    signInWithEmailAndPassword(auth, email, password)
      .then(function (userCredential) {
       
      })
      .catch(function (error) {
        if (error.code === "auth/multi-factor-auth-required") {
          const newResolver = getMultiFactorResolver(auth, error);
          // Ask user which second factor to use.
          if (newResolver.hints[0].factorId === PhoneMultiFactorGenerator.FACTOR_ID) {
            setResolver(newResolver);
            const phoneInfoOptions = {
              multiFactorHint: newResolver.hints[0],
              session: newResolver.session
            };
            const phoneAuthProvider = new PhoneAuthProvider(auth);
            // Send SMS verification code
            return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
              .then(function (newVerificationId) {
                setVerificationId(newVerificationId);
              });
          } else {
            // Unsupported second factor.
          }
        } else if (error.code === "auth/wrong-password") {
          // Handle other errors such as wrong password.
        }
      });
  };

  return (
    <div>
        <div id="recaptcha-container-id"></div>
      {resolver &&
        <div>
       
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button
            onClick={() => {
              const cred = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
              // Complete sign-in.
              return resolver.resolveSignIn(multiFactorAssertion)
                .then(function (userCredential) {
                    navigate("/dashboard");
                  console.log(userCredential);
                });
            }}
          >
            Submit
          </button>
        </div>
      }
     
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleSignIn(email, password)}>
        Sign In
      </button>
    </div>
    
  );
}

export default Login;
