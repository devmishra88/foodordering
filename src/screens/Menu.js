import React,{Component, Fragment} from 'react';

import { ProductContext } from '../context/Product';

import {Header, Banner, Menusearch, HomeCategory, FeaturedCategory, ItemsList} from '../components';

class Menu extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        this.state = {
            appid:'02e8cc31-5119-4fdf-b0c8-a518019ceec6'
        };
    }
    componentDidMount(){

        setTimeout(()=>{

            this.context.setAppHomeData(this.state.appid);

        },1500);

    }

    render(){
        
        return (

            <Fragment>
                <Header />
                <Banner />
                <Menusearch />
                <HomeCategory />
                <ItemsList />
            </Fragment>
        )
    }
}

export default Menu;