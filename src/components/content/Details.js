import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Details extends Component {
    state = {
        user: {
            name: "",
            email: "",
            title: "",
            description: ""
        }
    }

    handleSubmit = event => {
        event.preventDefault()
            this.submitUserSignup(this.state)
        this.setState({
            name: "",
            email: "",
            title: "",
            description: ""
        })
    }

    submitUserSignup = (userDetails) => {
        console.log(userDetails)
        fetch("/users/sign_in.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userDetails)
        })
        .then((response) => {
            if(!response.ok) {
                global.failed = true;
                this.detailsRecordedFailed(response.status)
            } else{
                global.success = true;
                this.detailsRecordedSuccessfully(response.json())
            }
          })
    }

    handleKeyDown(event) {
        if (event.keyCode === 13 ) {
          event.preventDefault();
        }
    }

    detailsRecordedSuccessfully = (detailsFromForm) => {
        console.log(detailsFromForm);
        this.props.history.push('/success');
    }

    detailsRecordedFailed = (responseStatus) => {
        console.log(responseStatus);
        this.props.history.push('/failed');
    }

    render() {
        return (
            <div className="details">
                <p>
                    Tell us how Open Science has helped you. We would like to share your success story with world. Just complete this form and the project team will evaluate it ASAP. Thanks!</p><br/>
                <Form id="details_form" onSubmit={event => this.handleSubmit(event)} >
                    <Form.Row>
                        <Form.Group>
                            <Form.Control type="text" name="name" placeholder="Your Name" value={this.state.name} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group>
                            <Form.Control type="email" name="email" placeholder="Your Email" value={this.state.email} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Form.Control type="text" name="title" placeholder="Story Title" value={this.state.title} />
                        </Form.Group>
                    </Form.Row>
                    <br></br>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>Write your story here !</Form.Label>
                            <Form.Control as="textarea" rows={10} name="description" value={this.state.description} />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" onKeyDown={this.handleKeyDown} id="submit_button" type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}