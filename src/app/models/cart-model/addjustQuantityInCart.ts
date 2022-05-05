import { ICart } from './cart'

export class AdjustCartItemQuantity{
    cart : ICart;
    previousCartItemQuantity : number;
    adjustedCartItemQuantity : number;
}