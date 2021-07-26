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

class Viewcart extends Component{

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
                        <Typography variant="body1" color="textPrimary" align="center" style={{color:'#00B970', fontSize:'2rem',fontWeight:'600',padding:'1rem 0'}}>
                            Congratulations!
                        </Typography>
                        <div style={{padding:'.5rem 0'}}>
                            <CheckCircleIcon color="primary" style={{fontSize:'7rem',color:'#00B970'}}/>
                        </div>
                        <Typography variant="body1" color="textPrimary" align="center" style={{color:'#00B970', fontSize:'1.2rem',fontWeight:'600',padding:'.3rem 0'}}>
                            Your order has been received.
                        </Typography>
                        <Typography variant="body1" color="textPrimary" align="center" style={{color:'#00B970', fontSize:'1.2rem',fontWeight:'600',padding:'.3rem 0'}}>
                            Order number:{order_id}
                        </Typography>
                        <List>
                            <ListItem style={{justifyContent:'center'}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submitphone}>
                                    View Order
                                </Button>
                            </ListItem>
                            <ListItem style={{justifyContent:'center'}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submitphone}>
                                    Continue browsing
                                </Button>
                            </ListItem>
                        </List>
                    </Container>
                );
            }}
            </ProductConsumer>
        );
	}
}

export default withStyles(useStyles, { withTheme: true })(Viewcart);