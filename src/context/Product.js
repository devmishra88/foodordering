import React,{Component} from 'react';
import axios from "axios";

import IDB from '../idb';

const ProductContext = React.createContext();
//Provider
//Consumer
/*jshint esversion: 6 */

class ProductProvider extends Component{

	state = {
		db:new IDB('nosh_v1')/*jshint ignore:line*/,
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

		allcategoryheading:"",
		iscategoryloaded:false,
		hascategory:false,
		allcategories:[],

		allitems:[],
		hasitems:false,
		allitemsheading:"",
		isitemloaded:false,
	}

	devInArray=(needle, haystack)=> {
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] === needle) return true;
		}
		return false;
	}	

	setAppHomeData = () => {

		this.setState(()=>{
			return{
				isdataloaded:false,
				haspopularitem:false,
			}
		},()=>{
			setTimeout(async()=>{

				let tempProducts 		= [];
				let tempCart			= [];

				let hasbanner			= false;
				let hasfeaturedcategory	= false;
				let haspopularitem		= false;
		
				let restaurantid		= localStorage.getItem('restaurantid') ? localStorage.getItem('restaurantid'):null;
		
				if(!restaurantid)
				{
					return;
				}

				const cartdetails	= await this.state.db.fetchAllCartItem();

				if(cartdetails)
				{
					cartdetails.forEach(item => {
						const singleCartItem = {...item, tempinstock:true};
	
						tempCart = [...tempCart, singleCartItem];
					});
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

						let item;
						for(item in homepopularitems)
						{
							let singleItem	= homepopularitems[item];

							const id		= singleItem.id;
							const price		= singleItem.price;

							let cartProduct	= tempCart.find(cartitem => cartitem.id === id);

							singleItem		= {...singleItem, busy:false, canuseoption:false, canrepeatoption:false, customitemqty:1, baseprice:price, optiontotal:0, iscustomization:true, inCart:false};

							if(cartProduct)
							{
								if(singleItem.iscustomization)
								{
									let tempcount	= 0;
	
									const customizationTempCart	= tempCart.filter(tempcartitem => tempcartitem.id === id);
	
									customizationTempCart.forEach((customizeitem)=>{
	
										const singlecustomizeitem = {...customizeitem};
	
										tempcount	+= singlecustomizeitem.count;
									});
	
									singleItem.count	= tempcount;
									singleItem.total	= cartProduct.total;
								}
								else
								{
									singleItem.count	= cartProduct.count;
									singleItem.total	= cartProduct.total;
								}

								singleItem.inCart	= true;
							}

							tempProducts = [...tempProducts, singleItem];
						}
					}
		
					this.setState(()=>{
						return{
							banners:homebanners,
							hasbanner:hasbanner,
							featuredcategory:homecategories,
							hasfeaturedcategory:hasfeaturedcategory,
							popularitems:tempProducts,
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

			},1000);
		});
	}

	setAppAllCategories = async () => {

		let temphascategory	= false;

		let restaurantid		= localStorage.getItem('restaurantid') ? localStorage.getItem('restaurantid'):null;

		if(!restaurantid)
		{
			return;
		}

		axios.get(`${process.env.REACT_APP_API_URL}/app_home?mid=${restaurantid}&all=category`) // api url
		.then( response => {
			
			let categories		= response.data.categories.list;
			let categoriesNum	= Object.keys(categories).length;
			
			if(categoriesNum > 0)
			{
				temphascategory	= true;
			}

			this.setState(()=>{
				return{
					iscategoryloaded:true,
					hascategory:temphascategory,
					allcategories:categories,
					allcategoryheading:response.data.categories.title,
				};
			});
		})
		.catch(function (error) {
			console.log(error);
		});		
	}

	setAllItems = () => {

		this.setState(()=>{
			return{
				isdataloaded:false,
				haspopularitem:false,
			}
		},()=>{
			setTimeout(async()=>{

				let tempProducts 		= [];
				let tempCart			= [];

				let temphasitems		= false;

				let restaurantid		= localStorage.getItem('restaurantid') ? localStorage.getItem('restaurantid'):null;
		
				if(!restaurantid)
				{
					return;
				}
				
				const cartdetails	= await this.state.db.fetchAllCartItem();

				if(cartdetails)
				{
					cartdetails.forEach(item => {
						const singleCartItem = {...item, tempinstock:true};
	
						tempCart = [...tempCart, singleCartItem];
					});
				}
				
				axios.get(`${process.env.REACT_APP_API_URL}/app_home?mid=${restaurantid}&all=popular`) // api url
				.then( response => {
								
					let allitems		= response.data.popularitems.list;
					let allitemsNum		= Object.keys(allitems).length;
		
					if(allitemsNum > 0)
					{
						temphasitems	= true;

						let item;
						for(item in allitems)
						{
							let singleItem	= allitems[item];

							const id		= singleItem.id;
							const price		= singleItem.price;

							let cartProduct	= tempCart.find(cartitem => cartitem.id === id);

							singleItem		= {...singleItem, busy:false, canuseoption:false, canrepeatoption:false, customitemqty:1, baseprice:price, optiontotal:0, iscustomization:true, inCart:false};

							if(cartProduct)
							{
								if(singleItem.iscustomization)
								{
									let tempcount	= 0;
	
									const customizationTempCart	= tempCart.filter(tempcartitem => tempcartitem.id === id);
	
									customizationTempCart.forEach((customizeitem)=>{
	
										const singlecustomizeitem = {...customizeitem};
	
										tempcount	+= singlecustomizeitem.count;
									});
	
									singleItem.count	= tempcount;
									singleItem.total	= cartProduct.total;
								}
								else
								{
									singleItem.count	= cartProduct.count;
									singleItem.total	= cartProduct.total;
								}

								singleItem.inCart	= true;
							}

							tempProducts = [...tempProducts, singleItem];
						}
					}
		
					this.setState(()=>{
						return{
							/*allitems:allitems,
							hasitems:temphasitems,
							allitemsheading:response.data.popularitems.title,
							isitemloaded:true,*/
							popularitems:tempProducts,
							haspopularitem:temphasitems,
							allitemsheading:response.data.popularitems.title,
							popularitemheading:response.data.popularitems.title,
							isdataloaded:true,
						};
					});
				})
				.catch(function (error) {
					console.log(error);
				});

			},1000);
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
                setAppAllCategories:this.setAppAllCategories,
                setAllItems:this.setAllItems,
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