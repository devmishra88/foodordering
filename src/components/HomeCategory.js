import React, {Component, Fragment} from 'react';
import {ProductConsumer} from '../context/Product';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import FeaturedCategoryLoading from './FeaturedCategoryLoading';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
  titlewrapper:{
    justifyContent:'space-between',
    display:'flex',
    alignItems:'center'
  },
  title: {
    flexGrow: 1,
    fontSize:'1.5rem',
    marginRight:theme.spacing(1),
    marginLeft:theme.spacing(1),
    marginBottom:theme.spacing(1.5),
  },
  viewalltitle:{
    color:'#00B970',
    fontWeight:'bold',
    marginRight:theme.spacing(1)
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
      margin:'auto'
  },
  cattitle:{
    position:'absolute',
    top: '8px',
    left:'8px',
    zIndex:'1',
    backgroundColor:'#1c1c1c',
    opacity:'0.65',
    color:'#ffffff',
    padding:'.2rem .5rem',
    borderRadius:'5px',
  }

});

class HomeCategory extends Component {

    constructor(props) {

        super(props);

        this.state = {

        }
	}
  
    render() {
      const { classes } = this.props;

      return (
        <ProductConsumer>
            {(value) => {

                const{isdataloaded, hasfeaturedcategory, featuredcategory, categoryheading} = value;

                return (
                    <Fragment>
            {
                isdataloaded ? (<Fragment>
                {
                    hasfeaturedcategory ? (
                        <Fragment>
                            <div className={classes.titlewrapper}>
                                <Typography variant="h6" className={classes.title}>
                                    {categoryheading}
                                </Typography>
                                <div className={classes.viewalltitle}>View all</div>
                            </div>
                            <Carousel responsive={responsive} infinite={false} autoPlaySpeed={1500} removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={this.props.deviceType} style={{margin:'0 5px'}}>
                            {featuredcategory.map((category, i) => {
                                return(
                                  <div className={classes.dfjlEy} key={i}>
                                    <div className={classes.cattitle}>{category.category_name}</div>
                                    <div className={classes.dqsEmh}></div>
                                    <img alt={category.category_name} src={category.image_url} className={classes.hppEfq} />
                                  </div>
                                );
                            })}
                            </Carousel>
                        </Fragment>
                    ):null
                }
                </Fragment>
                ):<FeaturedCategoryLoading />
            }
                    </Fragment>
                );
            }}
        </ProductConsumer>
      )
    }
}

export default withStyles(useStyles, { withTheme: true })(HomeCategory);
