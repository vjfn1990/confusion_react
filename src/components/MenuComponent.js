import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Menu extends Component {

    constructor(props) {
        super(props);
        console.log('MenuComponent constructor executed');
    }

    componentDidMount() {
        console.log('MenuComponent componentDidMount executed');
    }

    render() {
        
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 mt-5">
                    <Card onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay className="ml-5">
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        console.log('MenuComponent render executed');
        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

}

export default Menu;
