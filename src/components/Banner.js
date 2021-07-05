import React, {Component, Fragment} from 'react';
import {ProductConsumer} from '../context/Product';
import { withStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

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
    items: 1
  }
};

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor:'#00B970'
  },
});

class Banner extends Component {

    constructor(props) {

        super(props);

        this.state = {

        }
	}
  
    render() {

      return (
        <ProductConsumer>
            {(value) => {

                const{isdataloaded, hasbanner, banners} = value;

                return (
                    <Fragment>
            {
                isdataloaded ? (<Fragment>
                {
                    hasbanner ? (
                        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={1500} removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={this.props.deviceType} dotListClass="nosh-banner-dot" showDots>
                        {banners.map((banner, index) => {
                            return(
                                <div key={index}>
                                    <img src={banner.image_url} alt={`Banner ${Number(banner.index)+1}`} style={{width:'100%'}} />
                                </div>
                            );
                        })
                        }
                        </Carousel>
                    ):null
                }
                </Fragment>
                ):(
                  <Skeleton variant="rect" width="100%" height={180}/>
                )
            }
                    </Fragment>
                );
            }}
        </ProductConsumer>
      )
    }
}

export default withStyles(useStyles, { withTheme: true })(Banner);
