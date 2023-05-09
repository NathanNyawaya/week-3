import React, {useState} from 'react'
import { Categories } from './categories';
import { Products } from './products';

// nothing changed here, we are passing the props as you had passed before, nothing added

const Home = () => {

    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    function handleCategoryNameClick(e) {
        const category = e.target.textContent;
        setCategory(category);
        setLoading(true);
    }
    return (
        <div>
            <Categories handleCategoryNameClick={handleCategoryNameClick} />
            <Products categoryName={category} loading={loading} />
        </div>
    )
}

export default Home