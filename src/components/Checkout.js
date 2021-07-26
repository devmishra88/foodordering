import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Container, Button, Typography, List, ListItem} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { ProductConsumer, ProductContext } from '../context/Product';

const useStyles = (theme) => ({
    submitphone: {
      backgroundColor:'#00B970',
      borderRadius:'25px',
    }
});

class Checkout extends Component{

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){

    }

	render(){

        const { classes } = this.props;

        return (
            <ProductConsumer>
            {(value) => {

                const{ order_id } = value;

                return (
                    <Container maxWidth="lg" style={{height:'90vh',display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <Typography variant="body1" color="textPrimary" align="center" style={{color:'#00B970', fontSize:'1.2rem',fontWeight:'600',padding:'.3rem 0'}}>
                            checkout form
                        </Typography>
                    </Container>
                );
            }}
            </ProductConsumer>
        );
	}
}

export default withStyles(useStyles, { withTheme: true })(Checkout);