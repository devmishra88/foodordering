import React,{Component} from 'react';
import {withRouter} from "react-router-dom";
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
            caturl:'',
            catname:'',
        };
    }
    componentDidMount(){

        this.context.resetRedirectToMenu();

        this.setState(()=>{
            return{
                caturl:this.props.match.params.catname,
                catname:this.props.match.params.catname.split('-').join(' ').replace(/^./, this.props.match.params.catname[0].toUpperCase()),
            }
        },()=>{
            const {caturl} = this.state;

            this.context.setItemsByCategory(caturl);
        })

    }

    render(){

        const { classes } = this.props;

        const {caturl, catname} = this.state;

        return (

            <ProductConsumer>
                {(value) => {

                    return (
                        <div className={classes.root}>
                            <Header title={catname} showdrawer={false} history={this.props.history}/>
                            <ItemsList showtitle={false} group={caturl} />
                        </div>
                    );
                }}
            </ProductConsumer>
        )
    }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(AllItems));