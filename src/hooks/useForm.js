import React from "react";
import { v4 as uuidv4 } from "uuid";

export const useForm = ({ initialValues = {}, onSubmit }) => {
  const [values, setValues] = React.useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const currentTimeAndDate = new Date();

    e.preventDefault();
    onSubmit({
      ...values,
      id: uuidv4(),
      createdAt: currentTimeAndDate,
    });
    // reset form state after submitting
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
};
