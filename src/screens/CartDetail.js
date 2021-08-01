import React,{Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {ProductConsumer, ProductContext} from '../context/Product';

import {Header, Viewcart, Checkout, Orderthanks} from '../components';

class CartDetail extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        
        this.state = {

        };
    }
    componentDidMount(){

        this.context.resetRedirectToMenu();
        this.context.addTotals();        

    }

    goBack=()=>{

        this.props.history.goBack();
    }

    viewRecentOrder=()=>{

        this.props.history.push("/orderstatus");
    }

    render(){
        
        return (
            <ProductConsumer>
                {(value) => {

                    /*const{ cart, isorderadding, isalertopen, cartseverity, redirecttomenu, orderaddedmsg, isorderadded, cancheckout } = value;
                    const{ incrementCustomOption, decrementCustomOption, placeOrder, closeCartAlert } = value;*/

                    const{ cancheckout, isorderadded } = value;

                    if(!cancheckout)
                    {
                        return(
                            <Fragment>
                                <Header title="Cart" showdrawer={false} showsearch={true} history={this.props.history}/>
                                <Viewcart history={this.props.history} goBack={this.goBack}/>
                            </Fragment>
                        )
                    }
                    else
                    {
                        if(!isorderadded)
                        {
                            return(
                                <Fragment>
                                    <Header title="Checkout" showdrawer={false} showsearch={true} history={this.props.history}/>
                                    <Checkout history={this.props.history} goBack={this.goBack}/>
                                </Fragment>
                            )
                        }
                        else
                        {
                            return(
                                <Fragment>
                                    <Header title="Checkout" showdrawer={false} showsearch={true} history={this.props.history}/>
                                    <Orderthanks history={this.props.history} goBack={this.goBack} viewRecentOrder={this.viewRecentOrder}/>
                                </Fragment>
                            )
                        }
                    }
                }}
            </ProductConsumer>
        );
    }
}

export default withRouter(CartDetail);
