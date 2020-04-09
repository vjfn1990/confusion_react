import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
        console.log('DishdetailComponent constructor invoked');
    }

    componentDidMount() {
        console.log('DishdetailComponent componentDidMount invoked');
    }

    componentDidUpdate() {
        console.log('DishdetailComponent componentDidUpdate invoked');
    }

    renderComments(dish) {
        return( dish && (
            <>
                <h4>Comments</h4>
                <ul className = "list-unstyled">
                {dish.comments.map((comment, i) => {
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
            </>
        ));
    }

    renderDish(dish) {
        /*return dish &&
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>;*/
        return dish != null ?
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        :
            null
        ;
    }

    render() {
        console.log('DishdetailComponent render executed');
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {/*!!this.props.dish ? <h4>Comments</h4> : null*/}
                            {this.renderComments(this.props.dish)}
                    </div>
                </div>
            </div>
        );
    }

}

export default DishDetail;
