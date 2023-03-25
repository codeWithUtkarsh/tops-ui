import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {encode as base64_encode} from 'base-64';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;
console.log(env)
var TOKEN = process.env.REACT_APP_GH_TOKEN;
var OWNER = process.env.REACT_APP_GH_OWNER;
var REPO = process.env.REACT_APP_GH_REPO;
var PATH_DIRECTORY = process.env.REACT_APP_GH_REPO_DIRECTORY;
var API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/`;

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
        console.log(event)
        this.submitUserSignup(this.state)
        this.setState({
            name: "",
            email: "",
            title: "",
            description: ""
        })
    }

    submitUserSignup = (userDetails) => {

        var name = userDetails.user.name;
        var email = userDetails.user.email;
        var url = this.generateFileUrl(API, name, email) ;

        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*'
            }
        })
        .then((response) => {
            if(!response.ok && response.status !== 404 ) {
                console.log("The GitHub API failed while fetching file");
                this.detailsRecordedFailed(response.status)
             } else return response.json()
        })
        .then((data) => {
            this.createFileCommit(userDetails, data.sha)
        })
        .catch(() => {
            console.log("The GitHub API failed while commiting a file");
            this.detailsRecordedFailed("500");
            console.error("Something went wrong");
        });
    }

    createFileCommit = (userDetails, sha) => {

        console.log("creating a new commit for sha:: "+ sha);

        var name = userDetails.user.name;
        var email = userDetails.user.email;
        var title = userDetails.user.title;
        var description = userDetails.user.description;

        var mdPage = `# ${name}\n\n`.concat(`**${title}**\n`).concat(`> ${description}\n`);

        var content = base64_encode(mdPage);
        var url = this.generateFileUrl(API, name, email) ;

        var data = JSON.stringify({
            "message": `commit_my_story_${name}`,
            "committer": {
                "name": `${name}`,
                "email": `${email}`
            },
            "content": `${content}`,
            "sha": `${sha}`
        });

        fetch(url, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*'
            },
            body: data
        })
        .then((response) => {
            if(!response.ok) {
                console.log("The GitHub API failed while commiting a file");
                this.detailsRecordedFailed(response.status)
             } else return response.json()
        })
        .then((data) => {
          this.detailsRecordedSuccessfully(data);
        })    
        .catch(() => {
            console.log("The GitHub API failed while commiting a file");
            this.detailsRecordedFailed("500");
            console.error("Something went wrong");
        });
    }

    handleKeyDown(event) {
        if (event.keyCode === 13 ) {
          event.preventDefault();
        }
    }

    detailsRecordedSuccessfully = (detailsFromForm) => {
        console.log( "detailsRecordedSuccessfully" + detailsFromForm);
        global.success = true;
        this.props.history.push('/story/Transform-to-Open-Science/edit/success');
    }

    detailsRecordedFailed = (responseStatus) => {
        console.log( "detailsRecordedFailed" + responseStatus);
        global.failed = true;
        this.props.history.push('/story/Transform-to-Open-Science/edit/failed');
    }

    generateFileUrl = (API, name, email) => {
        if(PATH_DIRECTORY){
            return `${API}${PATH_DIRECTORY}${name}[${email}].md`
        }
        return `${API}${name}[${email}].md`
    }    

    handleChange = event => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    }

    render() {
        return (
            <div className="details">
                <p>
                    Tell us how Open Science has helped you. We would like to share your success story with world. Just complete this form and the project team will evaluate it ASAP. Thanks!</p><br/>
                <Form id="details_form" onSubmit={event => this.handleSubmit(event)} >
                    <Form.Row>
                        <Form.Group>
                            <Form.Control required type="text" name="name" placeholder="Your Name" onChange={event => this.handleChange(event)} value={this.state.name} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group>
                            <Form.Control required type="email" name="email" placeholder="Your Email" onChange={event => this.handleChange(event)} value={this.state.email} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Form.Control required type="text" name="title" placeholder="Story Title" onChange={event => this.handleChange(event)} value={this.state.title} />
                        </Form.Group>
                    </Form.Row>
                    <br></br>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>Write your story here !</Form.Label>
                            <Form.Control required as="textarea" rows={10} name="description" onChange={event => this.handleChange(event)} value={this.state.description} />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" onKeyDown={this.handleKeyDown} id="submit_button" type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}