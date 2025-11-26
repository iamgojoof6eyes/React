
function Card() {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
                <img className="p-8 rounded-t-lg" src="https://avatars.githubusercontent.com/u/91426868?v=4" alt="product_image1" />
            </a>
            <div className="px-5 pb-5">

                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Captain D. Ezio
                    </h5>
                <div className="flex items-center mt-2.5 mb-5">
                    
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        Hey This is me
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">Github Profile</span>
                    <a
                        href="https://github.com/iamgojoof6eyes"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        target="_blank"
                    >
                        Captain D. Ezio
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card
