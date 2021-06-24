import React,{Component, Fragment} from 'react';

import { ProductContext } from '../context/Product';

import {Header, Banner, Menusearch, HomeCategory, ItemsList, Ordereditems} from '../components';

class Menu extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        this.state = {

            isloaded:false

        };
    }
    componentDidMount(){

        if(!this.state.isloaded)
        {
            this.setState({

                isloaded:true

            },()=>{

                this.context.setAppHomeData();

            })
        }
    }

    render(){
        
        return (

            <Fragment>
                <Header title="Menu" showdrawer={true} />
                <Banner />
                <Menusearch />
                <HomeCategory />
                <Ordereditems />
                <ItemsList showtitle={true} group="home" />
            </Fragment>
        )
    }
}

export default Menu;