import React,{Component} from 'react';
import {ProductConsumer} from '../context/Product';

import { withStyles } from '@material-ui/core/styles';

import { ProductContext } from '../context/Product';

import {Header, ItemsList} from '../components';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class AllItems extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        
        this.state = {

        };
    }
    componentDidMount(){

        this.context.setAllItems();

    }

    render(){

        const { classes } = this.props;
        
        return (

            <ProductConsumer>
                {(value) => {

                    const{allitemsheading} = value;

                    return (
                        <div className={classes.root}>
                            <Header title={allitemsheading}/>
                            <ItemsList showtitle={false} />
                        </div>
                    );
                }}
            </ProductConsumer>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(AllItems);