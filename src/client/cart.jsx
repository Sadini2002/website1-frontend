import { getCart } from "../utils/cart";


export default function CartPage() {

    const [cart, setCart] = useState(getCart());
    return (

        
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
            {
                cart.map((item) => {
                    return (
                        <div key={item.productId} className="w-[500px] max-w-md p-4 border border-gray-300 rounded-md shadow-sm">
                            <img src={item.image} alt={item.name} className="w-full h-auto object-contain" />
                            <h2 className="text-lg font-bold mt-2">{item.name}</h2>
                            <p className="text-xl font-semibold">${item.price.toFixed(2)}</p>
                            <p className="text-gray-500">Quantity: {item.qty}</p>
                        </div>
                    );
                })
            }
        </div>
        

    )
}