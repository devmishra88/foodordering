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

		itemdetail:[],
		hasitemdetail:false,
		isdetailloaded:false,

		cartSubTotal:0,
		cartTax:0,
		cartTotal:0,
		cartTotalItem:0,
		cart:[],

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
	}

	getLiveItem = (id) =>{
		const product = this.state.allproducts.find(item => item.id === id);
		return product;
	}

	getItemDetail = (id) =>{

		this.setState(()=>{
			return{
				itemdetail:[],
				hasitemdetail:false,
				isdetailloaded:false,
			}
		},()=>{
			setTimeout(async()=>{

				let tempDetail 		= [];
				let tempCart		= [];

				let temphasitemdetail	= false;

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
				
				axios.get(`${process.env.REACT_APP_API_URL}/merchant_item?mid=${restaurantid}&iid=${id}`) // api url
				.then( response => {
					
					let orgitemdetail	= response.data[0];
					let itemdetailNum	= Object.keys(orgitemdetail).length;
		
					if(itemdetailNum > 0)
					{
						temphasitemdetail	= true;

						let item;
						/*for(item in allitems)
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
						}*/
					}

					let tempitemdetail	= orgitemdetail;

					this.setState(()=>{
						return{
							isdetailloaded:true,
							hasitemdetail:temphasitemdetail,
							itemdetail:tempitemdetail,
						};
					});
				})
				.catch(function (error) {
					console.log(error);
				});

			},1000);
		});
	}

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

	showBusy=(id)=>{

	}

	hideBusy=(id)=>{

	}

	getItem = (id) =>{
		const product = this.state.products.find(item => item.id === id);
		return product;
	};

	addToCart = (id, hasoption) =>{

		Promise.all([this.showBusy(id)])
        .then(async () => {

			let tempProducts	= [...this.state.products];

			const index			= tempProducts.indexOf(this.getItem(id));
			const product		= tempProducts[index];

			product.inCart		= true;
			const price			= product.price;

			if(hasoption === false)
			{
				product.count	= 1;
				product.total	= price;
			}
			else
			{
				product.canuseoption	= false;
				product.canrepeatoption	= false;

				let tempcount	= product.customitemqty;

				product.count	= tempcount;
				product.total	= price * tempcount;
			}

			await this.state.db.addNewItemInCart(product);

			this.setState(()=>{
				return {
					canuseoption:false,
					canrepeatoption:false,
					singlecustomizableitem:[],
					isduplicateorder:false,
					products:tempProducts,
					cart:[...this.state.cart, product]
				};
			},()=>{

				this.setProducts();
			})
    	})
	}

	increment = (id) => {

		Promise.all([this.showBusy(id)])
        .then(async () => {

			let tempProduct			= [...this.state.products];
			let tempCart			= [...this.state.cart];

			const selectedCartProduct	= tempCart.find(cartitem=>cartitem.id === id);

			const cartindex		= tempCart.indexOf(selectedCartProduct);
			let cartproduct		= [];

			let latestcartitem	= [];

			let tempcount	= 0;

			if(Number(selectedCartProduct.iscustomization) === 1)
			{
				const customizationTempCart	= tempCart.filter(tempcartitem => tempcartitem.id === id);

				customizationTempCart.forEach((customizeitem)=>{

					const singlecustomizeitem = {...customizeitem};

					latestcartitem	= singlecustomizeitem;

					tempcount	+= singlecustomizeitem.count;
				});
			}
			else
			{
				latestcartitem	= tempCart[cartindex];
				tempcount		= latestcartitem.count;
			}

			cartproduct	= latestcartitem;

			cartproduct.count	= cartproduct.count + 1;
			cartproduct.total	= cartproduct.price * cartproduct.count;

			const selectedStoreProduct	= tempProduct.find(item=>item.id === id);
			const storeitemindex		= tempProduct.indexOf(selectedStoreProduct);
			const storeproduct			= tempProduct[storeitemindex];

			storeproduct.count	= tempcount+1;
			storeproduct.total	= latestcartitem.total;

			storeproduct.canuseoption		= false;
			storeproduct.canrepeatoption	= false;

			await this.state.db.updateCartItem(cartproduct);

			this.setState(
				()=>{
					return{
						isduplicateorder:false,
						canplaceorder:false,
						canuseoption:false,
						canrepeatoption:false,
					};
				},
				()=>{
					this.setProducts();
				}
			);

		})
		.then(()=>{
			this.hideBusy(id);
		})
	}

	decrement = async (id) => {

		let tempCart			= [...this.state.cart];
		let tempProduct			= [...this.state.products];

		const selectedCartProduct	= tempCart.find(item=>item.id === id);

		const cartindex		= tempCart.indexOf(selectedCartProduct);
		const cartproduct	= tempCart[cartindex];

		cartproduct.count	= cartproduct.count - 1;

		const selectedStoreProduct	= tempProduct.find(item=>item.id === id);
		const storeitemindex		= tempProduct.indexOf(selectedStoreProduct);
		const storeproduct			= tempProduct[storeitemindex];

		storeproduct.count	= cartproduct.count;

		if(cartproduct.count === 0)
		{
			this.removeItem(id);
		}
		else
		{
			cartproduct.total	= cartproduct.price * cartproduct.count;

			storeproduct.total	= cartproduct.total;

			await this.state.db.updateCartItem(cartproduct);

			this.setState(
				()=>{
					return{
						isduplicateorder:false,
						canplaceorder:false,
						products:[...tempProduct],
						cart:[...tempCart]
					};
				},
				()=>{
					this.hideBusy(id);
					this.addTotals();
				}
			);
		}
	}

	removeItem = async (id) => {

		this.showBusy(id);

		let tempProducts	= [...this.state.products];
		let tempCart		= [...this.state.cart];

		tempCart	= tempCart.filter(item => item.id !== id);
		const index	= tempProducts.indexOf(this.getItem(id));

		let removedProduct	= tempProducts[index];

		removedProduct.inCart	= false;
		removedProduct.count	= 0;
		removedProduct.total	= 0;

		await this.state.db.deleteCartItem(removedProduct);

		this.setState(
			()=>{
				return{
					isduplicateorder:false,
					canplaceorder:false,
					cart:[...tempCart],
					products:[...tempProducts]
				};
			},
			()=>{
				this.hideBusy(id);
				this.addTotals();
			}
		);
	}

	incrementCustomOption = async(tempcartid) => {

		let tempCart			= [...this.state.cart];

		const cartproduct	= tempCart.find(cartitem=>cartitem.tempcartid === tempcartid);

		cartproduct.count	= cartproduct.count + 1;
		cartproduct.total	= cartproduct.price * cartproduct.count;

		await this.state.db.updateCartItem(cartproduct);

		this.setState(
			()=>{
				return{
					isduplicateorder:false,
					canplaceorder:false,
					canuseoption:false,
					canrepeatoption:false,
				};
			},
			()=>{
				document.body.style.overflow = "auto";
				this.setProducts();
			}
		);
	}

	decrementCustomOption = async (tempcartid) => {

		let tempCart			= [...this.state.cart];

		const selectedCartProduct	= tempCart.find(item=>item.tempcartid === tempcartid);

		const cartindex		= tempCart.indexOf(selectedCartProduct);
		const cartproduct	= tempCart[cartindex];

		let tempcount	= cartproduct.count - 1;

		if(tempcount === 0)
		{
			this.removeItemCustomOption(tempcartid);
		}
		else
		{
			/*cartproduct.count	= cartproduct.count - 1;*/
			if(tempcount < 1)
			{
				tempcount	= 1;
			}
			cartproduct.count	= tempcount;

			cartproduct.total	= cartproduct.price * cartproduct.count;

			await this.state.db.updateCartItem(cartproduct);

			this.setState(
				()=>{
					return{
						isduplicateorder:false,
						canplaceorder:false,
						cart:[...tempCart]
					};
				},
				()=>{
					document.body.style.overflow = "auto";
					this.setProducts();
				}
			);
		}
	}

	removeItemCustomOption = async (tempcartid) => {

		let tempCart	= [...this.state.cart];

		const removedProduct	= tempCart.find(item => item.tempcartid === tempcartid);

		removedProduct.inCart	= false;
		removedProduct.count	= 0;
		removedProduct.total	= 0;

		await this.state.db.deleteCartItemOption(removedProduct);

		this.setState(
			()=>{
				return{
					isduplicateorder:false,
					canplaceorder:false,
				};
			},
			()=>{
				this.setProducts();
			}
		);
	}

	handleOptionSelection = (id, categoryid, optionid, type) =>{

		let tempProducts	= [...this.state.products];
		const index			= tempProducts.indexOf(this.getItem(id));
		const product		= tempProducts[index];

		let hasselectedoption	= false;

		let tempOptionGroup	= product.itemoptions.find(optiongroup => optiongroup.customcatid === categoryid);
		let tempOption		= [...tempOptionGroup.options];

		if(type === 'radio')
		{
			tempOption.forEach((item)=>{
				item.checked = false;
			});
		}

		let tempItemOption	= tempOption.find(itemoption => itemoption.optionid === optionid);

		tempItemOption.checked	= !tempItemOption.checked;

		tempOption.forEach((option)=>{

			if(option.checked === true)
			{
				hasselectedoption = true;				
			}
		})

		let tempoptionprice	= 0;

		product.itemoptions.forEach((optiongroup)=>{

			optiongroup.options.forEach((option)=>{

				if(option.checked)
				{
					tempoptionprice	+= option.optionprice;
				}
			})
		})

		product.optiontotal	= tempoptionprice;
		product.price		= product.baseprice + tempoptionprice;

		tempOptionGroup.selected	= hasselectedoption;

		this.setState(()=>{
			return {
				products:tempProducts,
			};
		})
	}

	incrementCustomItem = (id) => {

		let tempProduct			= [...this.state.products];

		const selectedStoreProduct	= tempProduct.find(item=>item.id === id);
		const storeitemindex		= tempProduct.indexOf(selectedStoreProduct);
		const storeproduct			= tempProduct[storeitemindex];

		storeproduct.customitemqty	= storeproduct.customitemqty + 1;
		storeproduct.price			= storeproduct.baseprice + storeproduct.optiontotal;

		this.setState(
			()=>{
				return{
					products:[...tempProduct],
				};
			}
		);
	}

	decrementCustomItem = (id) => {

		let tempProduct			= [...this.state.products];

		const selectedStoreProduct	= tempProduct.find(item=>item.id === id);
		const storeitemindex		= tempProduct.indexOf(selectedStoreProduct);
		const storeproduct			= tempProduct[storeitemindex];

		const checkqty				= storeproduct.customitemqty;

		if(checkqty > 1)
		{
			storeproduct.customitemqty	= storeproduct.customitemqty -1;
			storeproduct.price			= storeproduct.baseprice + storeproduct.optiontotal;

			this.setState(
				()=>{
					return{
						products:[...tempProduct],
					};
				}
			);
		}
		else
		{
			storeproduct.canuseoption		= false;
			storeproduct.canrepeatoption	= false;

			this.setState(()=>{
				return{
					products:[...tempProduct],
				};
			},()=>{
				document.body.style.overflow = "auto";
			});
		}
	}

	clearCart = async () => {
		this.state.db.deleteAllCartItem();

		this.setState(()=>{
			return { cart:[] };
		},
		()=>{
			this.setProducts();
			this.addTotals();
		});
	}

	addTotals = () => {
		let subTotal = 0;
		let cartItem = 0;

		this.state.cart.map(item=>{
			return{
				subTotal: subTotal += item.total,
				cartItem: cartItem += item.count
			};
		});

		const tempTax	= subTotal * 0; /*here 0.1 is temp tax and can be dynamic*/
		const tax		= parseFloat(tempTax.toFixed(2));
		const total		= subTotal + tax;

		this.setState(()=>{
			return{
				cartSubTotal:subTotal,
				cartTax:tax,
				cartTotal:total,
				cartTotalItem:cartItem
			}
		},async()=>{

			const cartdetails	= await this.state.db.fetchAllCartItem();

			let tempCart	= [];

			if(cartdetails)
			{
				cartdetails.forEach(item => {
					const singleCartItem = {...item};

					tempCart = [...tempCart, singleCartItem];
				});

				this.setState({
					cart:tempCart,
				})
			}
		})
	}

	render(){
		return (
			<ProductContext.Provider value={{
			...this.state,
                setAppHomeData:this.setAppHomeData,
                setAppAllCategories:this.setAppAllCategories,
                setAllItems:this.setAllItems,
                getItemDetail:this.getItemDetail,
				handleUserInput:this.handleUserInput,
				showHideSearch:this.showHideSearch,
				handleChange:this.handleChange,
				addToCart:this.addToCart,
				increment:this.increment,
				decrement:this.decrement,
				removeItem:this.removeItem,
				incrementCustomOption:this.incrementCustomOption,
				decrementCustomOption:this.decrementCustomOption,
				removeItemCustomOption:this.removeItemCustomOption,
				handleOptionSelection:this.handleOptionSelection,
				incrementCustomItem:this.incrementCustomItem,
				decrementCustomItem:this.decrementCustomItem,
				clearCart:this.clearCart,
				addTotals:this.addTotals,
			}}
			>
			{this.props.children}
			</ProductContext.Provider>
		);
	}
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer, ProductContext};