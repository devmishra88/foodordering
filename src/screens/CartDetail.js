import React,{Component, Fragment} from 'react';

import { ProductContext } from '../context/Product';

import {Header} from '../components';

class CartDetail extends Component {

    static contextType = ProductContext;

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
                <Header title="Cart"/>
            </Fragment>
        )
    }
}

export default CartDetail;