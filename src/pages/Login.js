import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth, db } from "./../helpers/FireBase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GiGamepad } from "react-icons/gi";
import "./../styles/register.css";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        alert("User not found in database. Redirecting to register.");
        navigate("/register");
        return;
      }

      alert("Login successful!");
      resetForm();
      navigate("/games");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });

      navigate("/games");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>
          <GiGamepad style={{ marginRight: "10px", color: "red" }} />
          Login
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="inputField"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="inputField"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit" className="register-button">
              Login
            </button>
          </Form>
        </Formik>

        <p>or</p>

        <button
          onClick={handleGoogleSignIn}
          className="register-button google-button"
        >
          <FcGoogle style={{ fontSize: "20px", marginRight: "8px" }} />
          Continue with Google
        </button>
        <p>
          If you don't have an account?{" "}
          <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
