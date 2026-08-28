import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import FCard from "./FarmerViewCard";
import { getFilteredVegetables } from "./apiCore";
import { prices } from "./fixedPrices";
import ViewButton from "./ViewButton";
import RadioBox from "./RadioBox";

const Remove = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { farmer_id: [], price: [] }
    });

    const limit = 6;
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [click, setClick] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    
    const loadFilteredResults = newFilters => {
        getFilteredVegetables(skip, limit, newFilters).then(data => {
            if (data && data.data) {
                setFilteredResults(data.data);
                setSize(data.size || 0);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredVegetables(toSkip, limit, myFilters.filters).then(data => {
            if (data && data.data) {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size || 0);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        loadFilteredResults(myFilters.filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFilters = (filters, filterBy) => {
        console.log("SHOP", filters, filterBy);
        setClick(1);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(newFilters.filters);
        setMyFilters(newFilters);
        console.log("New Filters ", newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    const noItemsMessage = () => (
        <h2>
            Click on View Items <br />
        </h2>
    );

    const showItems = () => {
        return (
            <div>
                <div className="row">
                        {filteredResults.map((vegetable, i) => (
                            <FCard key={i} 
                                vegetable={vegetable} 
                                showAddToCartButton={false}
                                showRemoveVegetableButton={true}
                            />
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
            </div>
        );
    };

    return (
        <Layout
            title="Remove vegetables"
            description=""
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">
                    <h4>Click here </h4>
                    <ul>
                        <ViewButton
                            handleFilters={filters =>
                                handleFilters(filters, "farmer_id")
                            }
                        />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Vegetables</h2>
                    {click === 1 ? showItems() : noItemsMessage()}
                </div>
            </div>
        </Layout>
    );
};

export default Remove;
