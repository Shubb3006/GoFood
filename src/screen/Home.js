import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [search, setsearch] = useState("");
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);


  async function loaddata() {
    let res = await fetch("http://localhost:5000/api/food/fetchfooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    // console.log(res[0].categoryName);
    setfoodCat(res[1]);
    setfoodItem(res[0]);
  }
  useEffect(() => {
    loaddata();
  }, []);
  return (
    <div>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={search}
        onChange={(e) => setsearch(e.target.value.toLowerCase())}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
      <div className="m-3">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search)
                    )
                    .map((dataitem) => {
                      return (
                        <div
                          key={dataitem._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            id={dataitem._id}
                            name={dataitem.name}
                            description={dataitem.description}
                            img={dataitem.img}
                            options={dataitem.options[0]}
                            price={dataitem.option}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>D</div>
        )}
      </div>
    </div>
  );
}
