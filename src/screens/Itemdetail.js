import React,{Component, Fragment} from 'react';
import { ProductContext, ProductConsumer } from '../context/Product';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { Typography, FormControlLabel, Checkbox } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = (theme) => ({
    root: {
        width: '100%',
        height:'100vh',
        backgroundColor: '#ffffff',
        transform: 'translate3d(0px, 0px, 0px)',
        opacity: 1,
        zIndex: 1,
        display: 'block',
        position:'relative',
    },
    dYbSLL: {
        position: 'relative',
        maxWidth: '100%',
        width: '100%',
        overflow: 'hidden',
        visibility: 'visible',
        height: "18rem",
    },
    devdetorg:{
        padding: "1rem",
        borderRadius: "1.5rem 1.5rem 0px 0px",
        position:'absolute',
        left:'0',
        right:'0',
        bottom:'0',
        height:'55vh',
        width:'92%',
        background:'#ffffff',
    },
    lrgclr: {
        width: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        height: '100%',
        background: 'linear-gradient(to right, rgb(248, 248, 248) 0%, rgb(255, 255, 255) 10%, rgb(248, 248, 248) 40%, rgb(248, 248, 248) 100%) no-repeat rgb(248, 248, 248)',
        opacity: '1',
        transition: 'opacity 0.25s ease-out 0s',
        willChange: 'opacity',
        borderRadius: 'inherit',
        animation: '1.5s linear 0s infinite normal forwards running',
    },
    menupreview: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'none',
        opacity: '1',
        willChange: 'transform, opacity',
        borderRadius: 'inherit',
        filter: 'unset',
    },
    eggzWm: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0px',
    },
    gAkCTa:{
        fontSize: '1.2rem',
        lineHeight: '2rem',
        color: '#1c1c1c',
        fontWeight: '600',
        margin: '0px',
    },
    oRYSe:{
        display: 'block',
        overflow: 'initial',
    },
    idQvOD:{
        maxHeight: '40vh',
        overflow: 'hidden scroll',
    },
    hPCrWT:{
        border: '1px solid #e8e8e8',
        margin: '.5rem 0px',
    },
    wQCFM:{
        marginTop: '1rem',
    },
    idFvRo:{
        overflow: 'hidden',
    },
    gyBWSg:{
        color: '#1c1c1c',
        fontSize: '1.2rem',
        position:'relative',
    },
    optioncatname:{
        fontWeight: '600',
    },
    gfWojX:{
        width: '200%',
        display: 'flex',
        position: 'relative',
        top: '0px',
        left: '0px',
        transition: 'all 0.2s ease 0s',
        transform: 'translateX(0px)',
    },
    ktfTIz:{
        fontSize: '14px',
        color: '#cfcfcf',
        marginTop: '0.4rem',
        width: '50%',
    },
    izyrQJ:{
        fontSize: '14px',
        color: '#00B970',
        marginTop: '0.4rem',
        fontWeight: '400',
        width: '50%',
    },
    fABuGy:{
        marginTop: '1rem',
    },
    bmBDqp:{
        display: 'flex',
    },
    dUGYrj:{
        display: 'flex',
        /*-webkit-box-pack: 'justify',*/
        justifyContent: 'space-between',
        alignItems:'center',
        padding: '0px 0.2rem',
        width: '100%',
        marginBottom: '0.5rem',
    },
    fkUtKH:{
        lineHeight: '1.2rem',
        margin: '0px',
        color: '#363636',
        fontSize: '1.2rem',
    },
    ggJkFu:{
        display: 'flex',
        /*-webkit-box-align: 'center',*/
        alignItems: 'center',
    },
    jiHnaU:{
        marginLeft: '0.5rem',
        color: '#6d6a6a',
    },
    irrWnt:{
        width: 'max-content',
        marginBottom: '0.5rem',
        marginRight: '0px',
        display:'flex',
    },
    jrHtYr:{
        fontSize: '15px',
        color: '#1c1c1c',
        cursor: 'pointer',
        display: 'flex',
        /*-webkit-box-align: 'center',
        -webkit-box-pack: 'flex-start',*/
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
    },
    jlsszO:{
        display: 'none',
        flexShrink: '0',
    },
    bIPSGt:{
        height: '1.5rem',
        width: '1.5rem',
    },
    iszoyV:{
        stroke: 'rgb(156, 156, 156)',
        strokeWidth: '1px',
        fill: 'rgb(255, 255, 255)',
        flexShrink: '0',
    },
    cmcsiK:{
        flexShrink: '0',
        fill: '#00B970',
    },
    kTfLuB:{
        flexShrink: '0',
        stroke: '#00B970',
        strokeWidth: '1px',
        fill: 'rgb(255, 255, 255)',
    },
    jUrwkH:{
        paddingTop: '0.2rem',
        cursor: 'pointer',
        margin: '0px 0px 0.1rem 0.8rem',
    },
    iconblk:{
        display: 'flex',
        /*-webkit-box-align: center;*/
        alignItems: 'center',
        cursor: 'inherit',
        marginTop: '0rem',
    },
    teiDS:{
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        position: 'fixed',
        bottom: '0px',
        width: '94%',
        background: '#ffffff',
        left: '0px',
        padding: '1rem .8rem',
        boxShadow: 'rgb(0 0 0 / 10%) 0px -1px 20px',
        zIndex: '1000',
        borderRadius: '0px 0px 0.6rem 0.6rem',
    },
    fJNrek:{
        display: 'flex',
        flexDirection: 'column',
        /*-webkit-box-align: 'center',*/
        alignItems: 'center',
        paddingRight: '.5rem',
    },
    ipHtgH:{
        display: 'flex',
        /*-webkit-box-align: 'center',
        -webkit-box-pack: 'center',*/
        alignItems: 'center',
        justifyContent: 'center',
        width: '5.5rem',
        height: '2.5rem',
        border: '1px solid rgb(28, 28, 28)',
        borderRadius: '0.6rem',
        overflow: 'hidden',
        cursor: 'initial',
        userSelect: 'none',
        background: '#ecf9f4',
    },
    cMipmx:{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    hTzRFw:{
        position: 'relative',
        width: '100%',
        /*-webkit-box-flex: '0',
        -webkit-box-pack: 'center',
        -webkit-box-align: 'center',*/
        flexGrow: '0',
        flexShrink: '0',
        maxWidth: '31.6667%',
        padding: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    iNGntN:{
        display: 'flex',
        /*-webkit-box-align: center;*/
        alignItems: 'center',
        cursor: 'inherit',
        marginTop: '0.2rem',
    },
    listicon:{
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: '1',
        width: '15px',
        height: '15px',
    },
    iQCkqv:{
        position: 'relative',
        width: '100%',
        /*-webkit-box-flex: '0',
        -webkit-box-pack: 'center',
        -webkit-box-align: 'center',*/
        flexGrow: '0',
        flexShrink: '0',
        maxWidth: '36.6667%',
        padding: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ecf9f4',
        cursor: 'initial',
        height: '99%',
    },
    fTsfFl:{
        color: 'rgb(28, 28, 28)',
        fontSize: '1.2rem',
        margin: '0px 0.5rem',
        fontWeight: '500',
    },
    iconmargin:{
        marginTop: '0rem',
    },
    elxuhW:{
        width:'98%',
        minWidth: '12rem',
        minHeight: '44px',
        display: 'block',
        alignItems: 'stretch',
        borderRadius: '0.6rem',
        padding: '0px',
        border: 'none',
        cursor: 'pointer',
        background:'#00B970',
    },
    bXdRxo:{
        display: 'inline-flex',
        verticalAlign: 'middle',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '44px',
        lineHeight: '44px',
        marginTop: '0px',
        marginLeft: '0px',
        whiteSpace: 'nowrap',
        fontSize: '1.2rem',
        fontWeight: '300',
        color: '#ffffff',
        opacity: '1',
        background: 'border-box #00B970',
        borderColor: '#00B970',
        borderWidth: '0px',
        borderStyle: 'solid',
        borderRadius: '0.3rem',
    },
    dkwpEa:{
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: 'normal',
        fontSize: 'inherit',
        transition: 'transform 0.4s ease 0s',
    },
    eYrDjb:{
        display: 'flex',
        /*-webkit-box-align: 'center',*/
        alignItems: 'center',
    },
    btgzzv:{
        marginLeft: '0.6rem',
    },
    paper: {
        borderRadius: "1.5rem 1.5rem 0px 0px",
        padding: theme.spacing(1),
        position:'absolute',
        left:'0',
        right:'0',
        bottom:'3rem',
        boxShadow:'unset',
        height:'55vh',
    },
    footerwrapper: {
        position:'fixed',
        bottom:'0',
        width:'100%',
        height:'2.5rem'
    },
});

class Itemdetail extends Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);

        this.state = {
            iid:this.props.match.params.iid,
            isredirected:false
        };
    }

    componentDidMount(){

        this.setState({
            isredirected:false
        });

        this.context.resetRedirectToMenu();
        this.context.getItemDetail(this.props.match.params.iid);

    }

    goBack=()=>{

        if(this.state.isredirected)
        {
            return;
        }

        this.setState(()=>{
            return{
                isredirected:true
            }
        },()=>{
            this.props.history.goBack();
        })
    }

    render(){

        const { classes } = this.props;

        const { iid } = this.state;
        
        return (
            <ProductConsumer>
            {(value) => {

                const{itemdetail, hasitemdetail, isdetailloaded, cartsuccess, vertical, horizontal} = value;
                const{ handleOptionSelection, incrementCustomItem, decrementCustomItem, addToCart, closeSuccessCart, resetCartSuccess } = value;

                if(cartsuccess)
                {
                    setTimeout(()=>{
                        resetCartSuccess();
                        this.goBack();
                    },500)
                }

                return (
                    <Fragment>
                        {/*<Header title="Detail"/>*/}
                        {
                            isdetailloaded ? (
                                <Fragment>
                                    {
                                        hasitemdetail ? (<Fragment>
                                            <div className={classes.root}>
                                                <div className="close-button" onClick={()=>{
                                                    this.goBack();
                                                }}></div>
                                                <div className={classes.dYbSLL}>
                                                    <div className={classes.lrgclr}></div>
                                                    <img src={itemdetail.image_url} alt={`${itemdetail.item_name} Preview`} className={classes.menupreview} />
                                                </div>
                                                <Paper className={classes.paper}>
                                                    <section className={classes.eggzWm}>
                                                        <Typography color="textPrimary" variant="h5">{itemdetail.item_name}</Typography>
                                                        <Typography color="textPrimary" variant="h6"><i className="fa fa-inr"></i> {itemdetail.baseprice}</Typography>
                                                    </section>
                                                    <section className={classes.eggzWm}>
                                                        <Typography color="textPrimary" variant="subtitle1">{itemdetail.extras.extra_description}</Typography>
                                                    </section>

                                                    <section className={classes.oRYSe}>
                                                        <div className={classes.idQvOD}>
                                                            <div className={classes.hPCrWT}></div>
                                                            <div className={classes.wQCFM}>
                                                                <div className={classes.idFvRo}>
                                                                    <div className={classes.gyBWSg}>
                                                                        <div className={classes.optioncatname}>Choose {itemdetail.category} Extra</div>
                                                                    </div>
                                                                </div>
                                                                <div className={classes.fABuGy}>
                                                        {
                                                            itemdetail.extraoptions.map((option, i)=>{
                                                                return(
                                                                    <div className={classes.bmBDqp} key={i}>
                                                                        <div className={classes.dUGYrj}>
                                                                            <section className={classes.irrWnt}>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                    <Checkbox
                                                                                        checked={Number(option.checked) === 1}
                                                                                        onClick={()=>{handleOptionSelection(iid, option.optionid)}}
                                                                                        name={`itemoption_${option.optionid}`}
                                                                                        color="secondary"
                                                                                    />
                                                                                    }
                                                                                    label={option.item}
                                                                                />
                                                                            </section>
                                                                            <div className={classes.ggJkFu}>
                                                                                <div className={classes.jiHnaU} style={{fontWeight: '500', display: 'flex', alignItems: 'center', minWidth: '3.5rem', justifyContent: 'space-between'}}>
                                                                                    <i className={classes.iconblk} size="14" color="#6d6a6a"><svg xmlns="http://www.w3.org/2000/svg" fill="#6d6a6a" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className={classes.listicon}><title>plus</title><path d="M15.5 9.42h-4.5v-4.5c0-0.56-0.44-1-1-1s-1 0.44-1 1v4.5h-4.5c-0.56 0-1 0.44-1 1s0.44 1 1 1h4.5v4.5c0 0.54 0.44 1 1 1s1-0.46 1-1v-4.5h4.5c0.56 0 1-0.46 1-1s-0.44-1-1-1z"></path></svg></i><i className="fa fa-inr"></i> {option.price}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                                </div>
                                                            </div>
                                                            <div className={classes.kesDMu}></div>
                                                        </div>
                                                    </section>
                                                </Paper>

                                                <div className={classes.teiDS}>
                                                    <div className={classes.fJNrek}>
                                                        <div className={classes.ipHtgH}>
                                                            <div className={classes.cMipmx}>
                                                                <div className={classes.hTzRFw} onClick={()=>{decrementCustomItem(iid)}}>
                                                                    <i className={classes.iNGntN} size="14" color="#00B970"><svg xmlns="http://www.w3.org/2000/svg" fill="#00B970" width="14" height="14" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className={classes.listicon}><title>remove</title><path d="M10.96 10.96h4.28c0.53 0 0.96-0.43 0.96-0.96s-0.43-0.96-0.96-0.96v0h-10.48c-0.53 0-0.96 0.43-0.96 0.96s0.43 0.96 0.96 0.96v0h6.2z"></path></svg></i>
                                                                </div>
                                                                <div className={classes.iQCkqv} style={{color: "rgb(0, 0, 0)"}}>
                                                                    <span className={classes.fTsfFl}>{itemdetail.customitemqty}</span>
                                                                </div>
                                                                <div className={classes.hTzRFw} onClick={()=>{incrementCustomItem(iid)}}>
                                                                    <i className={classes.iconblk} size="14" color="#00B970"><svg xmlns="http://www.w3.org/2000/svg" fill="#00B970" width="14" height="14" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className={classes.listicon}><title>plus</title><path d="M15.5 9.42h-4.5v-4.5c0-0.56-0.44-1-1-1s-1 0.44-1 1v4.5h-4.5c-0.56 0-1 0.44-1 1s0.44 1 1 1h4.5v4.5c0 0.54 0.44 1 1 1s1-0.46 1-1v-4.5h4.5c0.56 0 1-0.46 1-1s-0.44-1-1-1z"></path></svg></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className={classes.elxuhW} onClick={()=>{addToCart(iid, true)}}><span className={classes.bXdRxo}><span className={classes.dkwpEa}><div className={classes.eYrDjb}><span>Add</span><div className={classes.btgzzv}><i className="fa fa-inr"></i> {(itemdetail.price * itemdetail.customitemqty).toFixed(2)}</div></div></span></span></button>
                                                </div>
                                            </div>
                                            <Snackbar autoHideDuration={3000} anchorOrigin={{vertical, horizontal}} open={cartsuccess} onClose={closeSuccessCart} message="Item added in cart successfully" key={vertical + horizontal}
                                            action={
                                                  <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    className={classes.close}
                                                    onClick={closeSuccessCart}
                                                  >
                                                    <CloseIcon />
                                                  </IconButton>
                                              }
                                            />
                                        </Fragment>):null
                                    }
                                </Fragment>
                            ):(<div style={{display:'flex',alignItems:'center',justifyContent:'center',flexGrow: 1, height:'90vh'}}>
                                <CircularProgress disableShrink />
                            </div>)
                        }
                    </Fragment>
                );
            }}
            </ProductConsumer>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(Itemdetail);