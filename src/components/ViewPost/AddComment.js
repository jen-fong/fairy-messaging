import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "../../hooks";

export function AddComment({ onAddComment }) {
  const { values, handleSubmit, handleChange } = useForm({
    initialValues: {
      name: "",
      message: "",
    },
    onSubmit: (data) => onAddComment(data),
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="commentName">
        <Form.Label>Reply Name</Form.Label>
        <Form.Control
          value={values.name}
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Enter name"
          required
        />
      </Form.Group>

      <Form.Group controlId="commentMessage">
        <Form.Label>Reply Message</Form.Label>
        <Form.Control
          value={values.message}
          name="message"
          onChange={handleChange}
          placeholder="Enter message"
          as="textarea"
          rows="3"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
