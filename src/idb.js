import Dexie from 'dexie';

export default class IDB {
    constructor(name) {
        this.DB = new Dexie(name);

        this.DB.version(1).stores({
            cart:"++tempcartid,id,merchant_id,baseprice,category,count,customitemqty,description,image_url,inCart,item_name,optiontotal,price,total,selectedoption,checkoptionstr",
            items:"++tempcartid,id,merchant_id,baseprice,category,count,customitemqty,description,image_url,inCart,item_name,optiontotal,price,total,selectedoption,checkoptionstr",
        });

        this.DB.open();
    }

    async addNewItemInCart(cartitem) {

        /*cartitem.createdon  = Date.now();
        cartitem.updatedon  = Date.now();*/

        this.DB.cart.add({...cartitem});
    }

    async updateCartItem(cartitem) {

        /*cartitem.updatedon  = Date.now();*/

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
}