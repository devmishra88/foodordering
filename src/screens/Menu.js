import React,{Component, Fragment} from 'react';

import { ProductContext } from '../context/Product';

import {Header, Banner, Menusearch, HomeCategory, FeaturedCategory, ItemsList} from '../components';

class Menu extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){

        setTimeout(()=>{

            this.context.setAppHomeData();

        },1500);

    }

    render(){
        
        return (

            <Fragment>
                <Header title="Menu"/>
                <Banner />
                <Menusearch />
                <HomeCategory />
                <ItemsList />
            </Fragment>
        )
    }
}

export default Menu;