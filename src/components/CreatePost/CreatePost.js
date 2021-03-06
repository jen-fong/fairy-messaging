import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "../../hooks";
import { addPost } from "../../actions/post";

export function CreatePost() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { values, handleSubmit, handleChange } = useForm({
    initialValues: {
      title: "",
      message: "",
      author: "",
    },
    onSubmit: (data) => {
      dispatch(addPost(data));
      history.push("/");
    },
  });

  return (
    <section>
      <header className="text-center mb-4">
        <h2>Create a new post</h2>
      </header>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={values.title}
            name="title"
            onChange={handleChange}
            type="text"
            placeholder="Enter title"
            required
          />
        </Form.Group>

        <Form.Group controlId="postMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            placeholder="Enter message"
            value={values.message}
            name="message"
            onChange={handleChange}
            as="textarea"
            rows="3"
            required
          />
        </Form.Group>

        <Form.Group controlId="postAuthor">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={values.author}
            onChange={handleChange}
            name="author"
            type="text"
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Link to="/">
            <Button className="mr-3" variant="secondary">
              Cancel
            </Button>
          </Link>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </section>
  );
}
