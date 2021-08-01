import React,{Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { ProductConsumer, ProductContext } from '../context/Product';

import {Header, Order, ItemNotFound} from '../components';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class Orders extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        
        this.state = {

        };
    }
    componentDidMount(){

        this.context.resetRedirectToMenu();
        this.context.initCustomerOrders();

    }

    render(){

        /*const { classes } = this.props;*/

        return (
            <ProductConsumer>
            {(value) => {

                const{ isorderloaded, hasorders, orderslist, nosh_localdata } = value;

                return (
                    <Fragment>
                        <Header title="My Order" showdrawer={false} showsearch={true} history={this.props.history}/>
                        {
                            isorderloaded ? (
                                <Fragment>
                                    {
                                        hasorders ? (
                                            <Fragment>
                                                {orderslist.map((order, i) => {
                                                    return <Order singleorder={order} nosh_localdata={nosh_localdata} key={i}/>
                                                })}
                                            </Fragment>
                                        ):(
                                            <ItemNotFound msg="Order not found"/>
                                        )
                                    }
                                </Fragment>
                            ):(
                                <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexGrow: 1, height:'90vh'}}>
                                    <CircularProgress disableShrink />
                                </div>
                            )
                        }
                    </Fragment>
                )
            }}
            </ProductConsumer>
        );
    }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Orders));