import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {ProductConsumer} from '../context/Product';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import FeaturedCategoryLoading from './FeaturedCategoryLoading';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {Remove,Plus}  from '../constants';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
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
    /*borderRadius: '0.4rem',*/
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
      width: '100%',
      height: '100%',
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
    /*position:'absolute',
    top: '8px',
    left:'8px',*/
    zIndex:'1',
    opacity:'0.65',
    color:'#171717',
    fontWeight:'bold',
    padding:'.2rem .5rem',
    borderRadius:'5px',
  },
  productblock:{
    height:'15rem',
    position:'relative',
    paddingTop:theme.spacing(.5),
    paddingLeft:theme.spacing(.5),
    paddingRight:theme.spacing(.5),
  },
  jOoliK:{
    display: 'flex',
    alignItems: 'center',
    margin: '0.5rem 0px',
  },
  cCiQWA:{
    fontSize: '.8rem',
    color: 'rgb(28, 28, 28)',
  },
  fJNrek:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cBmpNp:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4rem',
    height: '1.5rem',
    border: '1px solid rgb(181, 181, 181)',
    borderRadius: '0.2rem',
    overflow: 'hidden',
    cursor: 'pointer',
    userSelect: 'none',
    background: '#00B970',
    color: '#ffffff',
  },
  qtychildin:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4.5rem',
    height: '1.8rem',
    border: '1px solid #00B970',
    borderRadius: '0.2rem',
    overflow: 'hidden',
    cursor: 'initial',
    userSelect: 'none',
    background: '#00B970',
  },
  cMipmx:{
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  hTzRFw:{
    position: 'relative',
    width: '100%',
    flexGrow: '0',
    flexShrink: '0',
    maxWidth: '31.6667%',
    padding: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  iQCkqv:{
    position: 'relative',
    width: '100%',
    flexGrow: '0',
    flexShrink: '0',
    maxWidth: '36.6667%',
    padding: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#00B970',
    cursor: 'initial',
    height: '99%',
  },
  qtytitle:{
    color: '#ED5A6B',
    fontSize: '1.2rem',
    margin: '0px 0.5rem',
    fontWeight: '600',
  },  
});

class Ordereditems extends Component {

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

                const{isdataloaded, hasorderedproducts, orderedproductsheading, products} = value;

                const tempProducts  = products.filter(tempproduct => tempproduct.group === 'ordereditems');

                return (
                    <Fragment>
            {
                isdataloaded ? (<Fragment>
                {
                    hasorderedproducts ? (
                        <Fragment>
                            <div className={classes.titlewrapper}>
                                <Typography variant="h6" className={classes.title}>
                                    {orderedproductsheading}
                                </Typography>
                            </div>
                            <Carousel responsive={responsive} infinite={false} autoPlaySpeed={1500} removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={this.props.deviceType} style={{margin:'0 5px'}}>
                            {tempProducts.map((item, i) => {
                                return(
                                    <Paper variant="outlined" square className={classes.productblock} key={i}>
                                    <Link to={`/itemdetail/${item.id}`} style={{textDecoration:'none',color:'#5f5d5d'}}>
                                      <div className={classes.dfjlEy}>
                                        <div className={classes.dqsEmh}></div>
                                        <img alt={`${item.item_name} Preview`} src={item.image_url} className={classes.hppEfq} />
                                      </div>
                                    </Link>
                                    <div className={classes.cattitle}>{item.item_name.substr(0, 12)}...</div>
                                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'95%',marginTop:'1rem',position:'absolute',bottom:'5px'}}>
                                        <div className={classes.jOoliK}>
                                          <span className={classes.cCiQWA}><i className="fa fa-inr"></i>{item.price}</span>
                                        </div>
                                        {
                                          !item.inCart ? (
                                            <Link to={`/itemdetail/${item.id}`} style={{textDecoration:'none',color:'#5f5d5d'}}><div className={classes.fJNrek}>
                                              <div className={classes.cBmpNp}>
                                                <span>ADD</span>
                                              </div>
                                            </div></Link>
                                          ):(
                                          <div className={classes.qtychildin}>
                                              <div className={classes.cMipmx}>
                                                  <div className={classes.hTzRFw}>
                                                    <Link to={`/removecartitem/${item.id}`} style={{textDecoration:'none',color:'#5f5d5d'}}>
                                                      <Remove />
                                                    </Link>
                                                  </div>
                                                  <div className={classes.iQCkqv}>
                                                      <span className={classes.qtytitle} style={{
                                                          color:'#FFF6F7'
                                                      }}>{item.count}</span>
                                                  </div>
                                                    <div className={classes.hTzRFw}>
                                                      <Link to={`/itemdetail/${item.id}`} style={{textDecoration:'none',color:'#5f5d5d'}}>
                                                        <Plus />
                                                      </Link>
                                                    </div>
                                              </div>
                                          </div>
                                          )
                                        }
                                      </div>
                                    </Paper>
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

export default withStyles(useStyles, { withTheme: true })(Ordereditems);
