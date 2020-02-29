import React, {
    Component
} from 'react';
import {
    Modal,
    Button,
    Form,
    Col
} from 'react-bootstrap';
class UserNamemodal extends Component{
    state ={
        userName: '',
        show: false,
        unShow: true,
        validated: false,
        setValidated: false,
        message: '',

    };

    componentDidMount = () => {
        this.setState({
            show: true
        });

    };

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            this.setState({
                message: 'Please enter your name!'
            })
        }else {
            this.props.handleUsername(this.state.userName);
            this.setState({
                unShow: true,
                show: false
            })
        }

        this.setState({
            setValidated: true,
            validated: true
        });
    };

    handleUsername = (event) =>{
        this.setState({
            userName: event.target.value
        });
    };
    render = () => {

        return(
                <Modal centered show={this.state.show} >
                    <Modal.Header >
                        <Modal.Title>Type your name to continue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="name"
                                        value={this.state.userName}
                                        onChange={this.handleUsername}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit">Save</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

        )}
}
export default UserNamemodal;
