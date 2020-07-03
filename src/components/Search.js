import React, { useState, useEffect } from 'react';
import { getCategories, list } from '../pages/ApiCore';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.err) {
                console.log(data.err)
            } else {
                setData({
                    ...data,
                    categories: data
                })
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({
                search: search || undefined,
                category: category
            }).then(response => {
                if (response.err) {
                    console.log(response.err)
                } else {
                    setData({
                        ...data,
                        results: response,
                        searched: true
                    })
                }
            })
        }
    }

    const searchSubmit = (event) => {
        event.preventDefault();
        searchData();
    }

    const handleChange = name => event => {
        setData({
            ...data,
            [name]: event.target.value,
            searched: false
        })
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `${results.length} productos eoncontrados`
        }
        if (searched && results.length < 1) {
            return `No hay productos`
        }
    }

    const searchedProducts = (results = []) => (
        <div>
            <h2 className="mt-4 mb-4">
                {searchMessage(searched, results)}
            </h2>
            <div className="row">
            {results.map((product, i) => (
                <Card key={i} product={product} />
            ))}
        </div>
        </div>
    )

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">Todo</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Buscar por nombre" />
                </div>
                <div className="btn input-group-append" style={{ border: "none" }}>
                    <button className="input-group-text">Buscar</button>
                </div>
            </span>
        </form>
    )

    return (
        <div className="row">
            <div className="container mb-4">
                {searchForm()}
            </div>
            <div className="container-fluid mb-4">
                {searchedProducts(results)}
            </div>
        </div>
    );
}

export default Search;