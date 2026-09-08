function ProductCard({ product }) {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    return (
        <div className="
            w-full
            bg-white
            rounded-xl
            shadow-md
            overflow-hidden
            transition-all
            duration-300
            hover:shadow-xl
            hover:-translate-y-1
            sm:hover:scale-[1.02]
        ">
            <div className="w-full aspect-square overflow-hidden">
                <img
                    src={`${BASEURL}${product.image}`}
                    alt={product.name}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-300
                        hover:scale-105
                    "
                />
            </div>

            <div className="p-3 sm:p-4">
                <h2 className="
                    text-base
                    sm:text-lg
                    font-semibold
                    text-gray-800
                    truncate
                ">
                    {product.name}
                </h2>

                <p className="
                    mt-1
                    text-sm
                    sm:text-base
                    text-gray-600
                    font-medium
                ">
                    NRs: {product.price}
                </p>
            </div>
        </div>
    );
}

export default ProductCard;