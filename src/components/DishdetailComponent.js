import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
    
    renderComments(dish) {
        if(dish != null) {
            return(
                dish.comments.map((comment) => {
                    const formatted_date = new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                    }).format(new Date(comment.date));
                    return(
                        <div>
                            <li>{comment.comment}</li>
                            <br></br>
                            <li>-- {comment.author} , {formatted_date}</li>
                            <br></br>
                        </div>
                    );
                })
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    renderDish(dish) {
        if(dish != null) {
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    render() {
        var comments_title;
        if(this.props.dish != null) {
            comments_title = 'Comments';
        } else {
            comments_title = '';
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>{comments_title}</h4>
                        <ul class = "list-unstyled">
                            {this.renderComments(this.props.dish)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default DishDetail;
