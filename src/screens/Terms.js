import React,{Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { ProductContext } from '../context/Product';

import {Header} from '../components';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class Terms extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        
        this.state = {

        };
    }
    componentDidMount(){

        this.context.resetRedirectToMenu();
        this.context.searchItemByCatAndKeyword();
        this.context.setAppAllCategories();

    }

    render(){

        /*const { classes } = this.props;*/
        
        return (
            <Fragment>
                <Header title="Terms" showdrawer={false} showsearch={true} history={this.props.history}/>

            </Fragment>
        )
    }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Terms));