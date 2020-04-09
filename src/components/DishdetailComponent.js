import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

    function RenderComments({comments}) {
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
            </>
        ));
    }

    function RenderDish({dish}) {
        /*return dish &&
            (<Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>);*/
        return (dish != null ?
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        :
            null)
        ;
    }

    const DishDetail = (props) => {
        console.log('DishdetailComponent render executed');
        return props.dish != null ? 
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {/*!!this.props.dish ? <h4>Comments</h4> : null*/}
                        <RenderComments comments={props.dish.comments} />
                    </div>
                </div>
            </div>
        :
            null
        ;
    }

export default DishDetail;
