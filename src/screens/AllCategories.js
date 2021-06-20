import React,{Component} from 'react';
import {ProductConsumer, ProductContext} from '../context/Product';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Header} from '../components';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  gridList:{
    justifyContent:'space-between',
    marginTop:theme.spacing(1),
  },
  dfjlEy : {
    borderRadius: '0.4rem',
    overflow: 'hidden',
	visibility: 'visible',
    transition: 'all 0.12s ease 0s',
    position: 'relative',
    maxWidth: '100%',
    width: '8.5rem',
    height: '8.5rem',
  },
  cattitle:{
    left:'0',
    right:'0',
    bottom: '2.5rem',
    position:'absolute',
    zIndex:'1',
    color:'#ffffff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '1.5rem',
  },
  dqsEmh : {
      width: '95%',
      height: '95%',
      position: 'absolute',
      top: '0px',
      right:'0px',
      bottom:'0px',
      left: '0px',
      background: 'linear-gradient(to right, rgb(248, 248, 248) 0%, rgb(255, 255, 255) 10%, rgb(248, 248, 248) 40%, rgb(248, 248, 248) 100%) no-repeat rgb(248, 248, 248)',
      opacity: '0',
      transition: 'opacity 0.25s ease-out 0s',
      willChange: 'opacity',
      borderRadius: 'inherit',
  },
  hppEfq : {
      width: '95%',
      height: '95%',
      objectFit: 'cover',
      transform: 'none',
      opacity: '1',
      willChange: 'transform, opacity',
      borderRadius: 'inherit',
      filter: 'unset',
      transition: 'opacity 0.25s ease 0s, transform 0.25s ease 0s',
      margin:'auto',
      display:'block',
  }
});

class AllCategories extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        
        this.state = {

        };
    }
    componentDidMount(){

        setTimeout(()=>{

            this.context.resetRedirectToMenu();
            this.context.setAppAllCategories();

        },1500);

    }

    render(){

        const { classes } = this.props;
        
        return (

            <ProductConsumer>
                {(value) => {

                    const{allcategoryheading, iscategoryloaded, hascategory, allcategories} = value;

                    return (
                        <div className={classes.root}>
                            <Header title={allcategoryheading} showdrawer={false} history={this.props.history}/>
                            {
                                iscategoryloaded ? (<div>
                                {
                                    hascategory ? (<Grid container spacing={1} className={classes.gridList}>
                                        
                                        {allcategories.map((category, i) => {
                                            return(
                                                <Grid item xs={6} className={classes.dfjlEy}  key={i}>
                                                    <div className={classes.cattitle}>{category.category_name}</div>
                                                    <div className={classes.dqsEmh}></div>
                                                    <img alt={`${category.category_name} - Category`} src={category.image_url} className={classes.hppEfq} />
                                                </Grid>
                                            );
                                        })
                                        }
                                        </Grid>
                                    ):null
                                }
                                </div>
                                ):(<div style={{display:'flex',alignItems:'center',justifyContent:'center',flexGrow: 1, height:'90vh'}}>
                                    <CircularProgress disableShrink />
                                </div>)
                            }
                        </div>
                    );
                }}
            </ProductConsumer>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(AllCategories);
