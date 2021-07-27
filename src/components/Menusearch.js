import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Container, TextField} from '@material-ui/core';
import { ProductConsumer, ProductContext } from '../context/Product';
/*import {Search,CrossSearch}  from '../constants';*/

const useStyles = (theme) => ({
    container:{
        paddingRight:theme.spacing(1),
        paddingLeft:theme.spacing(1),
    },
    searwrapper:{
        width: '100%',
        display: 'flex',
        /*-webkit-box-pack: justify;
        -webkit-box-align: center;
        padding: 1.5rem 0px 0px;*/
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        padding: '0rem 0px 0px',
        height: '4rem',
        position: 'sticky',
        top: '0px',
        zIndex: '2'
    },
    searchbx:{
        position: 'relative',
        width: '100%',
    },
    firstfindchild:{
        position: 'relative',
        margin: '0px',
        height: '4rem',
    },
    findchildsub:{
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: 1,
        position: 'absolute',
        top: '18px',
        left: '10px',
    },
    iconsc:{
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: 1,
        width: '17px',
        height: '17px',
    },
    searchinput:{
        padding: '.5rem 2.5rem',
        height: '3.5rem',
        background: '#ffffff',
        /*border: 0.1rem solid rgb(207, 207, 207);*/
        border: '0.1rem solid #1A73E8',
        fontSize: '18px',
        width: '100%',
        outline: 'none',
        boxSizing: 'border-box',
        borderRadius: '0.6rem',
        color: '#1c1c1c',
    },
    closefindbox:{
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: 1,
        position: 'absolute',
        top: '12px',
        right: '10px',
    },
    closefindchild:{
        /*-webkit-box-align: center;*/
        cursor: 'pointer',
        width: '2.5rem',
        height: '3.5rem',
        display: 'flex',
        /*-webkit-box-align: center;
        -webkit-box-pack: center;
        */
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginTop: '-0.8rem',
    }
});

class MenuSearch extends Component{

    static contextType = ProductContext;

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){

    }

	render(){

        const { classes } = this.props;

        return (
            <ProductConsumer>
            {(value) => {

                const{ searchkeyword } = value;
                const{ handleChange } = value;

                return (
                    <Container maxWidth="lg" className={classes.container}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="searchkeyword"
                            label="Search within menu"
                            name="searchkeyword"
                            type="text"
                            autoComplete="searchkeyword"
                            value={searchkeyword}
                            onChange={handleChange}
                            autoFocus
                        />
                    </Container>
                );
            }}
            </ProductConsumer>
        );
	}
}

export default withStyles(useStyles, { withTheme: true })(MenuSearch);