import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class Menu extends Component {

    constructor(props) {
        super(props);
        console.log('MenuComponent constructor invoked');
    }

    componentDidMount() {
        console.log('MenuComponent componentDidMount invoked');
    }

    componentDidUpdate() {
        console.log('MenuComponent componentDidUpdate invoked');
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
        console.log('MenuComponent render invoked');
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
