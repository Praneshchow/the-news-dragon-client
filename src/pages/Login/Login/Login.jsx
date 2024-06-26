/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useTitle from "../../../hooks/useTitle";

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();          // private route. 
    const location = useLocation(); 
    // console.log("login page location: ", location); 

    useTitle("Login");     // showing title.  
    
    // location.state? is the optional chaining. 
    const from = location.state?.from?.pathname || '/category/0';         // if have the previous location. 

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        signIn(email, password)          // function call from 'AuthProvider' component. 
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, {replace: true});          // navigate (path location, history clear)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (

        <Container className="w-25 mx-auto mt-5">
            <h3>Please Login</h3>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
                <br />
                <Form.Text className="text-secondary">
                    Don't have an Account? <Link to="/register">Register</Link>
                </Form.Text>
            </Form>
        </Container>
    );
};

export default Login;