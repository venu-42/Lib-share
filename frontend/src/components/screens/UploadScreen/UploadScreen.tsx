import React, { useState, useEffect, FormEvent } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Link, RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { register } from "../../../redux/actions/userActions";
import { createProduct1 } from "../../../redux/actions/productActions";
import FormContainer from "../../FormContainer/FormContainer";
import axios from "axios";
// import FileBase64 from 'react-file-base64';

const RegisterScreen = ({ location, history }: RouteChildrenProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.userRegister);
  const { userInfo } = useAppSelector((state) => state.userLogin);

  // useEffect(() => {
  // 	if (!userInfo) {
  // 		history.push("/login");
  // 	} else {
  // 		if ((!user || user!._id !== userInfo._id) && !loading) {
  // 			dispatch(userDetails("profile"));
  // 		} else if (user) {
  // 			setName(user!.name);
  // 			setEmail(user!.email);
  // 		}

  // 		if (success) {
  // 			dispatch(userDetails("profile"));
  // 			success && setSuccessUpdate(success);
  // 			dispatch({ type: USER_EDIT_RESET });
  // 		}
  // 	}
  // 	// eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, history, success, user, userInfo]);

  const [baseImage, setBaseImage] = useState("");

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      name:title,
      category:"frictional",
      image:baseImage,
      author,
      brand:"bookstall",
      price,
      inStock:4,
      description
    }
    const y:any = dispatch(createProduct1(data));
    if(y) history.push('/');
    
    // console.log(res);
  };

  const getFiles = () => {};


  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    try {
      const base64: any = await convertBase64(file);
      setBaseImage(base64);
      // setTimeout(()=>console.log(baseImage),5000);
      // console.log(base64);
    } catch (err) {
      console.log(err);
    }
  };

  const convertBase64 = (file: any) => {
    return new Promise<any>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    // console.log(baseImage);
  }, [baseImage]);

  return (
    <FormContainer>
      <h3>Upload a Book</h3>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler} className="pt-4">
        <FormGroup controlId="name">
          <FormLabel>Book Title</FormLabel>
          <FormControl
            type="text"
            required
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="email">
          <FormLabel>Author</FormLabel>
          <FormControl
            type="text"
            required
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="password">
          <FormLabel>Description</FormLabel>
          <FormControl
            type="text"
            required
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="price">
          <FormLabel>Price</FormLabel>
          <FormControl
            type="number"
            required
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="price">
          <FormLabel>Upload Image</FormLabel>
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
          <br></br>
          <img src={baseImage} height="200px" alt="" />
        </FormGroup>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
