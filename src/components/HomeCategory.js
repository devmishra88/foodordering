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
    marginTop:theme.spacing(1.5),
    marginBottom:theme.spacing(1.5),
  },
  viewalltitle:{
    color:'#00B970',
    fontWeight:'bold',
    marginRight:theme.spacing(1)
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
                            <Carousel responsive={responsive} infinite={true} autoPlaySpeed={1500} removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={this.props.deviceType} style={{margin:'0 5px'}}>
                            {featuredcategory.map((category, i) => {
                                return(
                                    <Paper key={i} elevation={1}>
                                        <div>{category.category_name}</div>
                                        <img src={category.image_url} alt={category.category_name}/>
                                    </Paper>
                                );
                            })
                            }
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
