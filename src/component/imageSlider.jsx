export default function ImageSlider(props) {
    const { images } = props;
    return (
        <div className="w-[500px] h-[600px] bg-gray-200 flex items-center justify-center p-6">
            <div className="w-full h-full bg-blue-900">
                <img
                    src={images[0]}
                    alt="Product Image"
                    className="w-full h-full object-cover rounded-2xl hover:scale-105 transition duration-300"
                />
            </div>
        </div>
    );
}