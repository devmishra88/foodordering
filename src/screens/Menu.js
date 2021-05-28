import React,{Component, Fragment} from 'react';

import {Header, FeaturedCategory, ProductsListing} from '../components';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){

    }

    render(){
        
        return (

            <Fragment>
                <Header />
                <FeaturedCategory />
                <ProductsListing />
            </Fragment>
        )
    }
}

export default Menu;