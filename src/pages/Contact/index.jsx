import React from "react";
import ContactTitle from "./ContactTitle";
import ContactSideBar from "./ContactSideBar";
import ContactForm from "./ContactForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useMutation from "../../hooks/useMutation";

const Contact = () => {
  const navigate = useNavigate();
  const { execute, data, error, loading } = useMutation((payload) =>
    axios.post("https://cfdcourses.cfdcircle.vn/api/v1/subscribes", payload)
  );

  const handleFormSubmit = async (formData) => {
    // //  call api submit
    // console.log("🚀formData---->", formData);
    // setTimeout(() => {
    //   // back to home
    //   navigate("/");
    // }, 1000);
    const payload = {
      name: formData.name || "",
      title: formData.title || "",
      email: formData.email || "",
      description: formData.description || "",
      content: formData.content || "",
      phone: formData.phone || "",
    };
    execute?.(payload, {
      onSuccess: () => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
    });
    // setLoading(true);
    // try {
    //   const { data } = await axios.post(
    //     "https://cfdcourses.cfdcircle.vn/api/v1/subscribes",
    //     payload
    //   );
    //   console.log("🚀data---->", data);
    //   if (data) {
    //     alert("Success");
    //   }
    // } catch (error) {
    //   console.log("🚀error---->", error);
    // }
  };

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSideBar />
            <ContactForm handleSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
