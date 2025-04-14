import Service from "#services/base";
import Cart from "#models/cart";

class CartService extends Service {
  static Model = Cart;
}

export default CartService;
