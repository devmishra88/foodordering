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
		products:[],
		bannerheading:"",
		categoryheading:"",
		itemheading:"",
		hasbanner:false,
		hasfeaturedcategory:false,
		hasproducts:false,
		hasorderedproducts:false,
		orderedproductsheading:'',
		isdataloaded:false,
		isdataloadedhome:false,
		searchkeyword:'',

		allcategoryheading:"",
		iscategoryloaded:false,
		hascategory:false,
		allcategories:[],

		itemdetail:[],
		hasitemdetail:false,
		isdetailloaded:false,

		cartsuccess:false,
		vertical: 'bottom',
		horizontal: 'center',

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

	setAppAllCategories = async () => {

		let temphascategory	= false;

		let restaurantid		= localStorage.getItem('restaurantid') ? localStorage.getItem('restaurantid'):null;

		if(!restaurantid)
		{
			return;
		}

		axios.get(`${process.env.REACT_APP_API_URL}/app-home?mid=${restaurantid}&all=category`) // api url
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
			},()=>{
				this.addTotals();
			});
		})
		.catch(function (error) {
			console.log(error);
		});		
	}

	setAppHomeData = () => {

		const tempProducts	= [...this.state.products];

		const tempProductList	= tempProducts.filter(tempproduct => tempproduct.group === 'home');

		const tempProductsNum	= Object.keys(tempProductList).length;

		if(tempProductsNum > 0)
		{
			return false;
		}

		this.setState(()=>{
			return{
				isdataloaded:false,
				hasproducts:false,
				hasorderedproducts:false,
			}
		},()=>{
			setTimeout(async()=>{

				let tempProducts 		= [...this.state.products];
				let tempCart			= [];

				let hasbanner			= false;
				let hasfeaturedcategory	= false;
				let hasproducts			= false;
				let hasorderedproducts	= false;

				let tempuser	= "";

				let restaurantid	= localStorage.getItem('restaurantid') ? localStorage.getItem('restaurantid'):null;
				const user			= localStorage.getItem('user');

				if(user !== "guest")
				{
					tempuser	= `&cid=${user}`;
				}

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

				axios.get(`${process.env.REACT_APP_API_URL}/app-home?mid=${restaurantid}${tempuser}`) // api url
				.then( response => {
		
					let homebanners				= response.data.banners.list;
					let homebannersNum			= Object.keys(homebanners).length;
					
					let homecategories			= response.data.categories.list;
					let homecategoriesNum		= Object.keys(homecategories).length;
					
					let products			= response.data.popularitems.list;
					let productsNum			= Object.keys(products).length;

					let orderedproducts		= response.data.orders.list;
					let orderedProductsNum	= Object.keys(orderedproducts).length;

					if(homebannersNum > 0)
					{
						hasbanner	= true;
					}
		
					if(homecategoriesNum > 0)
					{
						hasfeaturedcategory	= true;
					}

					if(productsNum > 0)
					{
						hasproducts	= true;

						let item;
						for(item in products)
						{
							let singleItem	= products[item];

							const id		= singleItem.id;
							const price		= singleItem.price;

							let cartProduct	= tempCart.find(cartitem => cartitem.id === id);

							const customizationTempCart	= tempCart.filter(tempcartitem => tempcartitem.id === id);

							singleItem		= {...singleItem, group:'home', busy:false, customitemqty:1, baseprice:price, optiontotal:0, iscustomization:true, inCart:false};

							if(cartProduct)
							{
								let tempcount	= 0;

								customizationTempCart.forEach((customizeitem)=>{

									const singlecustomizeitem = {...customizeitem};

									tempcount	+= singlecustomizeitem.count;
								});

								singleItem.count	= tempcount;
								singleItem.total	= cartProduct.total;

								singleItem.inCart	= true;
							}

							tempProducts = [...tempProducts, singleItem];
						}
					}

					if(orderedProductsNum > 0)
					{
						hasorderedproducts	= true;

						let item;
						for(item in orderedproducts)
						{
							let singleItem	= orderedproducts[item];

							const id		= singleItem.id;
							const price		= singleItem.price;

							let cartProduct	= tempCart.find(cartitem => cartitem.id === id);

							const customizationTempCart	= tempCart.filter(tempcartitem => tempcartitem.id === id);

							singleItem		= {...singleItem, group:'ordereditems', busy:false, customitemqty:1, baseprice:price, optiontotal:0, iscustomization:true, inCart:false};

							if(cartProduct)
							{
								let tempcount	= 0;

								customizationTempCart.forEach((customizeitem)=>{

									const singlecustomizeitem = {...customizeitem};

									tempcount	+= singlecustomizeitem.count;
								});

								singleItem.count	= tempcount;
								singleItem.total	= cartProduct.total;

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
							cart:tempCart,
							products:tempProducts,
							hasproducts:hasproducts,
							hasorderedproducts:hasorderedproducts,
							orderedproductsheading:response.data.orders.title,
							bannerheading:response.data.banners.title,
							categoryheading:response.data.categories.title,
							itemheading:response.data.popularitems.title,
							isdataloaded:true,
							isdataloadedhome:true,
						};
					},()=>{
						this.addTotals();
					});
				})
				.catch(function (error) {
					console.log(error);
				});				

			},1000);
		});
	}

	setAllItems = () => {

		const tempProducts	= [...this.state.products];

		const tempProductList	= tempProducts.filter(tempproduct => tempproduct.group === 'popular');

		const tempProductsNum	= Object.keys(tempProductList).length;

		if(tempProductsNum > 0)
		{
			return false;
		}

		this.setState(()=>{
			return{
				isdataloaded:false,
				hasproducts:false,
			}
		},()=>{
			setTimeout(async()=>{

				let tempProducts 		= [...this.state.products];
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
				
				axios.get(`${process.env.REACT_APP_API_URL}/app-home?mid=${restaurantid}&all=popular`) // api url
				.then( response => {

					let products		= response.data.popularitems.list;
					let productsNum		= Object.keys(products).length;
		
					if(productsNum > 0)
					{
						temphasitems	= true;

						let item;
						for(item in products)
						{
							let singleItem	= products[item];

							const id		= singleItem.id;
							const price		= singleItem.price;

							let cartProduct	= tempCart.find(cartitem => cartitem.id === id);

							const customizationTempCart	= tempCart.filter(tempcartitem => tempcartitem.id === id);

							singleItem		= {...singleItem, group:'popular', busy:false, customitemqty:1, baseprice:price, optiontotal:0, iscustomization:true, inCart:false};

							if(cartProduct)
							{
								let tempcount	= 0;

								customizationTempCart.forEach((customizeitem)=>{

									const singlecustomizeitem = {...customizeitem};

									tempcount	+= singlecustomizeitem.count;
								});

								singleItem.count	= tempcount;
								singleItem.total	= cartProduct.total;

								singleItem.inCart	= true;
							}

							tempProducts = [...tempProducts, singleItem];
						}
					}
		
					this.setState(()=>{
						return{
							cart:tempCart,
							products:tempProducts,
							hasproducts:temphasitems,
							itemheading:response.data.popularitems.title,
							isdataloaded:true,
						};
					},()=>{
						this.addTotals();
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

	getItemDetail = (id) =>{

		this.setState(()=>{
			return{
				itemdetail:[],
				hasitemdetail:false,
				isdetailloaded:false,
			}
		},()=>{
			setTimeout(async()=>{

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
				
				axios.get(`${process.env.REACT_APP_API_URL}/merchant-item?mid=${restaurantid}&iid=${id}`) // api url
				.then( response => {
					
					let orgitemdetail	= response.data[0];
					let itemdetailNum	= Object.keys(orgitemdetail).length;
		
					if(itemdetailNum > 0)
					{
						temphasitemdetail	= true;

						let singleItem	= orgitemdetail;

						const id		= singleItem.id;
						const price		= singleItem.price;

						let tempExtraItem	= [];

						singleItem.extras.extra_items.forEach((option, i)=>{

							const singleoption = {...option, checked:false, optionid:`${id}_${i+1}`};

							tempExtraItem	= [...tempExtraItem, singleoption];
						});

						singleItem		= {...singleItem, busy:false, customitemqty:1, baseprice:price, optiontotal:0, iscustomization:true, inCart:false, extraoptions:tempExtraItem};

						this.setState(()=>{
							return{
								isdetailloaded:true,
								hasitemdetail:temphasitemdetail,
								itemdetail:singleItem,
								cart:tempCart,
							};
						});

					}
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

			let tempCart		= [...this.state.cart];
			let tempProducts	= [...this.state.products];

			let product			= this.state.itemdetail;

			product.inCart		= true;
			const price			= product.price;

			if(hasoption === false)
			{
				product.count	= 1;
				product.total	= price;
			}
			else
			{
				let tempcount	= product.customitemqty;

				product.count	= tempcount;
				product.total	= price * tempcount;
			}

			let tempproduct	= {};

			tempproduct.id				= product.id;
			tempproduct.merchant_id		= product.merchant_id;
			tempproduct.baseprice		= product.baseprice;
			tempproduct.category		= product.category;
			tempproduct.count			= Number(product.count);
			tempproduct.customitemqty	= Number(product.customitemqty);
			tempproduct.description		= product.description;
			tempproduct.image_url		= product.image_url;
			tempproduct.inCart			= product.inCart;
			tempproduct.item_name		= product.item_name;
			tempproduct.optiontotal		= product.optiontotal;
			tempproduct.price			= product.price;
			tempproduct.total			= Number(product.total);

			let tempselectedoption		= [];

			let checkstr				= "";

			product.extraoptions.forEach((option)=>{

				if(option.checked)
				{
					const singleOption	= {item:option.item, price:option.price};
					tempselectedoption	= [...tempselectedoption, singleOption];

					checkstr	+= option.item+" ";
				}
			})

			checkstr	= checkstr.split(' ').join('').toLowerCase();

			tempproduct.selectedoption	= tempselectedoption;
			tempproduct.checkoptionstr	= checkstr;

			const selectedCartProduct	= tempCart.find(item=>item.checkoptionstr === checkstr && item.id === id);

			if(selectedCartProduct === undefined || selectedCartProduct === null)
			{
				await this.state.db.addNewItemInCart(tempproduct);
			}
			else
			{
				tempproduct.tempcartid		= selectedCartProduct.tempcartid;
				tempproduct.count			+= Number(selectedCartProduct.count);
				tempproduct.customitemqty	+= Number(selectedCartProduct.customitemqty);
				tempproduct.total			+= Number(selectedCartProduct.total);

				tempproduct.total			= tempproduct.total;

				await this.state.db.updateCartItem(tempproduct);
			}

			const cartdetails	= await this.state.db.fetchAllCartItem();

			if(cartdetails)
			{
				cartdetails.forEach(item => {
					const singleCartItem = {...item, tempinstock:true};

					const singletempProducts	= tempProducts.find(item=>item.id === singleCartItem.id);

					if(singletempProducts !== undefined && singletempProducts !== null)
					{
						singletempProducts.count			= singleCartItem.count;
						singletempProducts.customitemqty	= singleCartItem.customitemqty;
						singletempProducts.inCart			= singleCartItem.inCart;
					}

					tempCart = [...tempCart, singleCartItem];
				});
			}

			product.count			= 1;
			product.customitemqty	= 1;
			product.price			= product.baseprice;
			product.total			= product.baseprice;

			product.extraoptions.forEach((option)=>{

				option.checked	= false;

			})

			this.setState(()=>{
				return {
					cart:tempCart,
					products:tempProducts,
					product:product,
					cartsuccess:true,
				};
			},()=>{
				this.addTotals();
			})
    	})
	}

	incrementCustomOption = async(tempcartid) => {

		let tempCart		= [...this.state.cart];

		const cartproduct	= tempCart.find(cartitem=>cartitem.tempcartid === tempcartid);

		cartproduct.count			= cartproduct.count + 1;
		cartproduct.customitemqty	= cartproduct.customitemqty + 1;
		cartproduct.total			= cartproduct.price * cartproduct.count;

		await this.state.db.updateCartItem(cartproduct);

		this.addTotals();
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
			if(tempcount < 1)
			{
				tempcount	= 1;
			}
			cartproduct.count			= tempcount;
			cartproduct.customitemqty	= tempcount;

			cartproduct.total	= cartproduct.price * cartproduct.count;

			await this.state.db.updateCartItem(cartproduct);

			this.setState(
				()=>{
					return{
						cart:[...tempCart]
					};
				},
				()=>{
					this.addTotals();
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
					canplaceorder:false,
				};
			},
			()=>{
				this.addTotals();
			}
		);
	}

	handleOptionSelection = (id, optionid) =>{

		let product		= this.state.itemdetail;

		let tempOption	= [...product.extraoptions];

		let tempItemOption	= tempOption.find(itemoption => itemoption.optionid === optionid);

		tempItemOption.checked	= !tempItemOption.checked;

		let tempoptionprice	= 0;

		tempOption.forEach((option)=>{

			if(option.checked)
			{
				tempoptionprice	+= option.price;
			}
		})

		product.optiontotal	= tempoptionprice;
		product.price		= product.baseprice + tempoptionprice;

		this.setState(()=>{
			return {
				itemdetail:product,
			};
		})
	}

	incrementCustomItem = (id) => {

		let storeproduct			= this.state.itemdetail;

		storeproduct.customitemqty	= storeproduct.customitemqty + 1;
		storeproduct.price			= storeproduct.baseprice + storeproduct.optiontotal;

		this.setState(
			()=>{
				return{
					itemdetail:storeproduct,
				};
			}
		);
	}

	decrementCustomItem = (id) => {

		let storeproduct	= this.state.itemdetail;
		const checkqty		= storeproduct.customitemqty;

		if(checkqty > 1)
		{
			storeproduct.customitemqty	= storeproduct.customitemqty -1;
			storeproduct.price			= storeproduct.baseprice + storeproduct.optiontotal;

			this.setState(
				()=>{
					return{
						itemdetail:storeproduct,
					};
				}
			);
		}
		else
		{
			this.setState(()=>{
				return{
					itemdetail:storeproduct,
				};
			});
		}
	}

	clearCart = async () => {
		this.state.db.deleteAllCartItem();

		this.setState(()=>{
			return { cart:[] };
		},
		()=>{
			this.addTotals();
		});
	}

	addTotals = async() => {

		let subTotal = 0;
		let cartItem = 0;

		let tempProducts 	= [...this.state.products];
		const cartdetails	= await this.state.db.fetchAllCartItem();

		let tempCart	= [];

		let tempNewProducts	= [];

		if(cartdetails)
		{
			cartdetails.forEach(item => {
				const singleCartItem = {...item};

				tempCart = [...tempCart, singleCartItem];
			});

			this.setState({

				cart:tempCart,

			},()=>{

				this.state.cart.map(item=>{
					return{
						subTotal: subTotal += item.total,
						cartItem: cartItem += item.count
					};
				});

				tempProducts.forEach(item => {
					const singleItem	= {...item};

					const id		= singleItem.id;

					const cartProduct			= this.state.cart.find(cartitem => cartitem.id === id);
					const customizationTempCart	= this.state.cart.filter(tempcartitem => tempcartitem.id === id);

					if(cartProduct)
					{
						let tempcount	= 0;

						customizationTempCart.forEach((customizeitem)=>{

							const singlecustomizeitem = {...customizeitem};

							tempcount	+= singlecustomizeitem.count;
						});

						singleItem.count	= tempcount;
						singleItem.total	= cartProduct.total;

						singleItem.inCart	= true;
					}

					tempNewProducts = [...tempNewProducts, singleItem];
				});

				const tempTax	= subTotal * 0; /*here 0.1 is temp tax and can be dynamic*/
				const tax		= parseFloat(tempTax.toFixed(2));
				const total		= subTotal + tax;

				this.setState(()=>{
					return{
						cartSubTotal:subTotal,
						cartTax:tax,
						cartTotal:total,
						cartTotalItem:cartItem,
						products:tempNewProducts
					}
				})
			})
		}
		else
		{
			tempProducts.forEach(item => {
				const singleItem	= {...item};

				singleItem.count	= 1;
				singleItem.total	= singleItem.price;
				singleItem.inCart	= false;

				tempNewProducts = [...tempNewProducts, singleItem];
			});

			this.setState(()=>{
				return{
					cartSubTotal:0,
					cartTax:0,
					cartTotal:0,
					cartTotalItem:0,
					products:tempNewProducts
				}
			})
		}
	}

	closeSuccessCart=()=>{

		this.setState({

			cartsuccess:false

		})

	}

	placeOrder = async() => {

		const { cartTotal, cartTotalItem } = this.state;

		const cartdetails	= await this.state.db.fetchAllCartItem();

		let marketing	= false;

		if(Number(localStorage.getItem('isagree')) > 0)
		{
			marketing	= true;
		}

		let cartItem	= [];

		if(cartdetails)
		{
			cartdetails.forEach(item => {

				const { id, item_name, category, description, image_url, price, total, count, selectedoption }	= item;

				let singleitem	= {};

				singleitem.item_id		= id;
				singleitem.item_name	= item_name;
				singleitem.category		= category;
				singleitem.description	= description;
				singleitem.image_url	= image_url;
				singleitem.price		= price;
				singleitem.total		= total;
				singleitem.quantity		= count;
				singleitem.extra_items	= selectedoption;

				cartItem	= [...cartItem, singleitem];
			});
		}

		let cartItemNum		= Object.keys(cartItem).length;

		let restaurantid	= localStorage.getItem('restaurantid') ? localStorage.getItem('restaurantid'):null;

		if(!restaurantid || cartItemNum < 1)
		{
			return;
		}

		const bodyFormData = {
			"merchant_id": localStorage.getItem('restaurantid'),
			"customer_id": localStorage.getItem('user'),
			"marketing": marketing,
			"country_code": "IN",
			"table_no": 1,
			"total_amount": cartTotal,
			"total_quantity": cartTotalItem,
			"discount_coupon": "ABC123",
			"discount_amount": 5,
			"items": cartItem,
		};

        axios({
            method: 'post',
			url: `${process.env.REACT_APP_API_URL}/customer-order?mid=${restaurantid}`,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response=>{

			console.log(response);

			return false;

        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });		

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
				removeItemCustomOption:this.removeItemCustomOption,
				handleOptionSelection:this.handleOptionSelection,
				incrementCustomOption:this.incrementCustomOption,
				decrementCustomOption:this.decrementCustomOption,
				incrementCustomItem:this.incrementCustomItem,
				decrementCustomItem:this.decrementCustomItem,
				clearCart:this.clearCart,
				addTotals:this.addTotals,
				closeSuccessCart:this.closeSuccessCart,
				placeOrder:this.placeOrder,
			}}
			>
			{this.props.children}
			</ProductContext.Provider>
		);
	}
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer, ProductContext};