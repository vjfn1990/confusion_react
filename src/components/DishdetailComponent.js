import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal} >
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select defaultValue="1" model=".rating" name="rating" className="form-control">
                                    {[...Array(6).keys()].slice(1).map((value, index) => {
                                        return <option key={index}>{value}</option>
                                    })}
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text defaultValue="" model=".name" className="form-control" id="name" name="name" placeholder="Your Name"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required field ',
                                            minLength: 'Should at least be 3 characters long ',
                                            maxLength: 'Should be less than or equal to 15 characters '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea defaultValue="" model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

    function RenderComments({comments, addComment, dishId }) {
        return( comments && (
            <>
                <h4>Comments</h4>
                <ul className = "list-unstyled">
                {comments.map((comment, i) => {
                    const formatted_date = new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                    }).format(new Date(comment.date));
                    return(
                        <div key={i}>
                            <li>{comment.comment}</li>
                            <br></br>
                            <li>{`-- ${comment.author} , ${formatted_date}`}</li>
                            <br></br>
                        </div>
                    );
                })}
                </ul>
                <CommentForm addComment={addComment} dishId={dishId} />
            </>
        ));
    }

    function RenderDish({dish}) {
        return dish &&
            (<Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>);
        /*return (dish != null ?
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        :
            null)
        ;*/
    }

    const DishDetail = (props) => {
        return props.dish != null ? 
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {/*!!this.props.dish ? <h4>Comments</h4> : null*/}
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        :
            null
        ;
    }

export default DishDetail;
