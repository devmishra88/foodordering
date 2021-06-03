import React,{Component} from 'react';
import axios from "axios";

const ProductContext = React.createContext();
//Provider
//Consumer
/*jshint esversion: 6 */

class ProductProvider extends Component{

	state = {
		banners:[],
		featuredcategory:[],
		popularitems:[],
		bannerheading:"",
		categoryheading:"",
		popularitemheading:"",
		hasbanner:false,
		hasfeaturedcategory:false,
		haspopularitem:false,
		isdataloaded:false,
		searchkeyword:'',
	}

	devInArray=(needle, haystack)=> {
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] === needle) return true;
		}
		return false;
	}	

	setAppHomeData = async () => {

		let hasbanner			= false;
		let hasfeaturedcategory	= false;
		let haspopularitem		= false;

		let restaurantid		= localStorage.getItem('restaurantid') ? localStorage.getItem('restaurantid'):null;

		if(!restaurantid)
		{
			return;
		}

		axios.get(`${process.env.REACT_APP_API_URL}/app_home?mid=${restaurantid}`) // api url
		.then( response => {

			let homebanners				= response.data.banners.list;
			let homebannersNum			= Object.keys(homebanners).length;
			
			let homecategories			= response.data.categories.list;
			let homecategoriesNum		= Object.keys(homecategories).length;
			
			let homepopularitems		= response.data.popularitems.list;
			let homepopularitemsNum		= Object.keys(homepopularitems).length;

			if(homebannersNum > 0)
			{
				hasbanner	= true;
			}

			if(homecategoriesNum > 0)
			{
				hasfeaturedcategory	= true;
			}
			if(homepopularitemsNum > 0)
			{
				haspopularitem	= true;
			}

			this.setState(()=>{
				return{
					banners:homebanners,
					hasbanner:hasbanner,
					featuredcategory:homecategories,
					hasfeaturedcategory:hasfeaturedcategory,
					popularitems:homepopularitems,
					haspopularitem:haspopularitem,
					bannerheading:response.data.banners.title,
					categoryheading:response.data.categories.title,
					popularitemheading:response.data.popularitems.title,
					isdataloaded:true,
				};
			});
		})
		.catch(function (error) {
			console.log(error);
		});		
	}

	getItem = (id) =>{
		const product = this.state.products.find(item => item.id === id);
		return product;
	};

	getLiveItem = (id) =>{
		const product = this.state.allproducts.find(item => item.id === id);
		return product;
	};

	handleUserInput = (e) =>{
		const name	= e.target.name;
		const value	= e.target.value;

		if(name === "mobilenumber" && value.length > 10)
		{
			return false;
		}

		if(name === 'edititem_isoutofstock')
		{
			this.setState({
				edititem_isoutofstock:!this.state.edititem_isoutofstock
			})
		}
		else if(name === 'edititem_islivecounter')
		{
			this.setState({
				edititem_islivecounter:!this.state.edititem_islivecounter
			})			
		}
		else if(name === 'edititem_isselfservice')
		{
			this.setState({
				edititem_isselfservice:!this.state.edititem_isselfservice
			})			
		}
		else
		{
			this.setState(()=>{
				return{
					[name]:value
				}
			},()=>{
				if(this.state.categoryid === "-1")
				{
					this.setState({
						isnewcategory:true
					});
				}
				else
				{
					this.setState({
						isnewcategory:false
					});
				}
				this.validateField(name, value);
			})
		}
	}

	showHideSearch=()=>{

	}

	handleChange=()=>{

	}

	decrement = ()=>{

	}

	increment = ()=>{

	}

	render(){
		return (
			<ProductContext.Provider value={{
			...this.state,
                setAppHomeData:this.setAppHomeData,
				handleUserInput:this.handleUserInput,
				showHideSearch:this.showHideSearch,
				handleChange:this.handleChange,
				decrement:this.decrement,
				increment:this.increment,
			}}
			>
			{this.props.children}
			</ProductContext.Provider>
		);
	}
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer, ProductContext};