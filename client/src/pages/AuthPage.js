import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useMessage } from "../hooks/message.hook";
import { gql, useMutation } from "@apollo/client";
import { isLoggedIn, isAdminVar } from "../cache";
import { AUTH_TOKEN } from "../constatns";
import * as Yup from "yup";
import { useApolloClient } from "@apollo/react-hooks";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      id
      email
      token
      isAdmin
    }
  }
`;

const REGISTRATION = gql`
  mutation Registration($email: String!, $password: String!) {
    registration(password: $password, email: $email) {
      id
      email
      token
      isAdmin
    }
  }
`;

export const AuthPage = () => {
  const client = useApolloClient();

  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN
  );

  const [registration, { loading, error }] = useMutation(REGISTRATION);

  const message = useMessage();

  useEffect(() => {
    message(error || loginError);
  }, [error, loginError, message]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      isRegistration: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .min(5, "Too Short!")
        .max(250, "Too Long!")
        .email("Email is not valid")
        .required("Required"),
      password: Yup.string()
        .min(3, "Too Short!")
        .max(30, "Too Long!")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      if (values.isRegistration) {
        try {
          const { data } = await registration({
            variables: { email: values.email, password: values.password },
          });
          localStorage.setItem(AUTH_TOKEN, data.token);
          isLoggedIn(true);
          isAdminVar(data.isAdmin);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const { data } = await login({
            variables: { email: values.email, password: values.password },
          });
          localStorage.setItem(AUTH_TOKEN, data.login.token);
          isLoggedIn(true);
          isAdminVar(data.login.isAdmin);
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h3>crud</h3>
        <div className="card teal darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <form onSubmit={formik.handleSubmit}>
              <input
                className="orange-input"
                name="email"
                placeholder="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
              <input
                className="orange-input"
                type="password"
                name="password"
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="current password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}

              <button
                className="btn deep-orange darken-1"
                type="submit"
                disabled={loading && loginLoading}
              >
                Login
              </button>

              <button
                className="btn grey lighten-2 black-text"
                type="registration"
                disabled={loading && loginLoading}
                onClick={(e) => formik.setFieldValue("isRegistration", true)}
              >
                Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
