import React, {Component, Fragment} from 'react';
import {ProductConsumer} from '../context/Product';
import Menusearch from './Menusearch';

import { withStyles } from '@material-ui/core/styles';
import {Chip} from '@material-ui/core';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4
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
  filterwrapper: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
      marginTop:theme.spacing(1.5),
      marginBottom:theme.spacing(2),
    }
  },
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

                const{deleteSelectedFilter, applySelectedFilter} = value;
                const{iscategoryloaded, hascategory, allcategories, selectedfiltercategory} = value;

                return (
                    <Fragment>
                    <Menusearch />
            {
                iscategoryloaded ? (<Fragment>
                {
                    hascategory ? (
                        <div className={classes.filterwrapper}>
                            <Carousel responsive={responsive} infinite={false} autoPlaySpeed={1500} removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={this.props.deviceType} style={{margin:'0 5px'}}>
                            {allcategories.map((category, i) => {
                              if(selectedfiltercategory === category.category_name)
                              {
                                return(
                                    <Chip key={i} label={category.category_name} style={{backgroundColor:`${selectedfiltercategory === category.category_name ? '#00B970':''}`}} onDelete={deleteSelectedFilter}/>
                                );
                              }
                              else
                              {
                                return(
                                    <Chip key={i} label={category.category_name} style={{backgroundColor:`${selectedfiltercategory === category.category_name ? '#00B970':''}`}}  onClick={()=>{
                                      applySelectedFilter(category.category_name);
                                    }}/>
                                );
                              }
                            })}
                            </Carousel>
                        </div>
                    ):null
                }
                </Fragment>
                ):null
            }
                    </Fragment>
                );
            }}
        </ProductConsumer>
      )
    }
}

export default withStyles(useStyles, { withTheme: true })(HomeCategory);
