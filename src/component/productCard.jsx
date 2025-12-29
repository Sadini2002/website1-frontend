export default function ProductCard(props){

    const product = props.product;
    return(
        <div className="w-[200px] h-[300px] bg-gray-300 shadow-2xl flex flex-col">
            <img className="productImage" src={product.picture} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h2>Price : ${product.price}</h2>
            <button className="addToCart">Add to Cart</button>
            <button className="buyNow">Buy Now</button>
        </div>




    )
}