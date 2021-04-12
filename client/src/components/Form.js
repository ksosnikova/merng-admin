import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import {
  CREATE_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
} from "../graphql/queries";
import { useMessage } from "../hooks/message.hook";
import { useFormik } from "formik";
import * as Yup from "yup";

const emptyForm = {
  name: "",
  gender: "",
  birthday: "",
  city: "",
};

export const Form = ({ profile, isEdit, onClick }) => {
  const message = useMessage();
  const history = useHistory();

  const [createProfile, { loading, error }] = useMutation(CREATE_PROFILE);
  const { loading: profilesLoading, error: profilesError, data } = useQuery(
    GET_PROFILES
  );
  const [
    updateProfile,
    { loading: loadingOnUpdate, error: errorOnUpdate },
  ] = useMutation(UPDATE_PROFILE);
  const birthDate = useRef(null);

  useEffect(() => {
    message(error);
  }, [error, message]);

  useEffect(() => {
    window.M.updateTextFields();
    window.M.Datepicker.init(birthDate.current, {
      format: "dd.mm.yyyy",
    });
  }, []);

  const formik = useFormik({
    initialValues: profile || emptyForm,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(25, "Must be 15 characters or less")
        .required("Required"),
      city: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(25, "Must be 15 characters or less")
        .required("Required"),
      gender: Yup.string().required("Required"),
      birthday: Yup.string(),
      //.required("Required"),
    }),
    onSubmit: async (values) => {
      if (!birthDate.current.value) {
        formik.errors.birthday = "Please choose birthday";
      } else
        try {
          if (isEdit) {
            console.log("in edit profiles", profile);
            const data = await updateProfile({
              variables: {
                profileId: profile.id,
                profileInput: {
                  name: values.name,
                  gender: values.gender,
                  city: values.city,
                  birthday: birthDate.current.value,
                },
              },
              refetchQueries: [{ query: GET_PROFILES }],
            });
            onClick();
          } else {
            const data = await createProfile({
              variables: {
                profileInput: {
                  name: values.name,
                  gender: values.gender,
                  city: values.city,
                  birthday: birthDate.current.value,
                },
              },
              refetchQueries: [{ query: GET_PROFILES }],
            });
            const profileId = data.data.createProfile.id;
            history.push(`detail/${profileId}`);
          }
        } catch (error) {}
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-field col s8 offset-s2">
          <input
            placeholder="Enter name"
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
          <label htmlFor="name">Enter name</label>
        </div>

        <div className="search-input-field col s8 offset-s2">
          <label htmlFor="gender">Gender</label>
          <div>
            <select
              className="browser-default"
              id="gender"
              name="gender"
              value={formik.values.gender}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="" disabled id="default-select">
                Any
              </option>
              <option value="Мужской">Men</option>
              <option value="Женский">Women</option>
            </select>
          </div>
          {formik.touched.gender && formik.errors.gender ? (
            <div>{formik.errors.gender}</div>
          ) : null}
        </div>

        <div className="input-field col s8 offset-s2">
          <label htmlFor="city">Enter city</label>
          <input
            placeholder="Enter city"
            id="city"
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            disabled={loading}
          />
          {formik.touched.city && formik.errors.city ? (
            <div>{formik.errors.city}</div>
          ) : null}
        </div>

        <div className="input-field col s8 offset-s2">
          <input
            placeholder="Enter your birthday"
            name="birthday"
            id="birthday"
            type="text"
            className="datepicker"
            onChange={formik.handleChange}
            defaultValue={formik.values.birthday || ""}
            ref={birthDate}
          />
          {formik.touched.birthday && formik.errors.birthday ? (
            <div>{formik.errors.birthday}</div>
          ) : null}
          <label htmlFor="birthday">Enter your birtdate</label>
        </div>

        <div className="bottom-row col s4 offset-s4">
          <a
            className="waves-effect waves-light btn-flat reset-button"
            onClick={() => formik.resetForm(emptyForm)}
          >
            Reset
          </a>
          {!isEdit && (
            <button
              className="waves-effect waves-light btn grey accent-4 search-button"
              type="submit"
            >
              Create
            </button>
          )}
          {isEdit && (
            <button
              className="waves-effect waves-light btn grey accent-4 search-button"
              type="submit"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </>
  );
};
