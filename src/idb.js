import Dexie from 'dexie';

export default class IDB {
    constructor(name) {
        this.DB = new Dexie(name);

        this.DB.version(1).stores({
            cart:"++tempcartid,merchant_id,id,item_name,category,description,image_url,price,inCart,count,total,extra_items",
            items:"++tempcartid,merchant_id,id,item_name,category,description,image_url,price,inCart,count,total,extra_items",
        });

        this.DB.open();
    }

    async addNewItemInCart(cartitem) {

        cartitem.createdon  = Date.now();
        cartitem.updatedon  = Date.now();
                
        this.DB.cart.add({...cartitem});
    }

    async updateCartItem(cartitem) {

        cartitem.updatedon  = Date.now();

        await this.DB.cart.update(cartitem.tempcartid, {...cartitem}).then(function (updated) {
        if (updated)
            {/*console.log("items cart updated");*/}
        else
            console.log("error occure in updating cart item");
        });
    }

    async deleteCartItem(cartitem) {

        /*await this.DB.cart.delete(cartitem.id);*/
        await this.DB.cart.where("id").equals(cartitem.id).delete();
        
    }

    async deleteCartItemOption(cartitem) {

        /*await this.DB.cart.delete(cartitem.id);*/
        await this.DB.cart.where("tempcartid").equals(cartitem.tempcartid).delete();
        
    }

    async deleteAllCartItem() {

        let result    = await this.DB.cart.clear();

        return result;
    }

    async fetchAllCartItem() {

        let result    = await this.DB.cart.toArray();

        return result;
    }

    async addLastOrderedCart() {

        let cartdetails = await this.DB.cart.toArray();

        if(cartdetails)
        {
            this.DB.lastorderedcart.clear();
                        
            cartdetails.forEach(item => {
                const cartitem = {...item};

                this.DB.lastorderedcart.add({...cartitem});
            });
        }
    }

    async fetchAllLastOrderItem() {

        let result    = await this.DB.lastorderedcart.toArray();

        return result;
    }

    async deleteAllLastCartItem() {

        let result    = await this.DB.lastorderedcart.clear();

        return result;
    }
}