import React,{Component, Fragment} from 'react';

import { ProductContext } from '../context/Product';

import {Header} from '../components';

class AllItems extends Component {

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
                <Header title="All Items"/>
            </Fragment>
        )
    }
}

export default AllItems;