import React, { useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const FarmerDashboard = () => {
    const {
        user: { _id, name, email, location, role }
    } = isAuthenticated();

    useEffect(() => {
        if (location) {
            GetInfo();
            onloadData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const GetInfo = () => {
        if (!location) return;
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=metric&cnt=50&appid=44aef6ede898ea08ff2f4d21eea9762c')
            .then(response => response.json())
            .then(data => {
                if (!data || !data.list) return;
                var start_time = 0;
                var end_time = 40;

                for (var i = start_time, j = 0; i < end_time && i < data.list.length; i += 8, j++) {
                    const tempEl = document.getElementById("day" + (j + 1) + "_temp_range");
                    if (tempEl && data.list[i].main) {
                        tempEl.innerHTML = "Temp Range -> " + data.list[i].main.temp_min + "° - " + data.list[i].main.temp_max + "°";
                    }

                    const imgEl = document.getElementById("img" + (j + 1));
                    if (imgEl && data.list[i].weather && data.list[i].weather[0]) {
                        imgEl.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
                    }

                    const windEl = document.getElementById("day" + (j + 1) + "_wind");
                    if (windEl && data.list[i].wind) {
                        windEl.innerHTML = "Wind Speed -> " + data.list[i].wind.speed + "m/s";
                    }

                    const humidEl = document.getElementById("day" + (j + 1) + "_humid");
                    if (humidEl && data.list[i].main) {
                        humidEl.innerHTML = "Humidity -> " + data.list[i].main.humidity + "%";
                    }

                    const descEl = document.getElementById("day" + (j + 1) + "_desc");
                    if (descEl && data.list[i].weather && data.list[i].weather[0]) {
                        descEl.innerHTML = "Weather -> " + data.list[i].weather[0].description;
                    }
                }

                for (var k = 0; k < 5; k++) {
                    const dayEl = document.getElementById("day" + (k + 1));
                    if (dayEl) {
                        dayEl.innerHTML = weekday[CheckDay(k)];
                    }
                }
            })
            .catch(err => {
                console.log("Weather fetch error:", err);
            });
    };
    //Getting and displaying the text for the upcoming five days of the week
    var d = new Date();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    
    //Function to get the correct integer for the index of the days array
    function CheckDay(day){
        // console.log(day + d.getDay());
        if(day + d.getDay() > 6){
            return day + d.getDay() - 7;
        }
        else{
            return day + d.getDay();
        }
    }

   

    const WeatherApi = () =>{
        return (
            
            <div id = "weatherContainer">
                
            <div id="iconsContainer">  
            <div className="row">

                <div className = "col-md-2 offset-md-1 icons">
                    <div className="mycard">
                    <div className="row offset-md-4 image">
                    <img src="dots.png" alt="Weather Day 1" className="imgClass" id="img1"/> 
                    </div>
                    <div className="weather_info">
                        <div className="weather" id="day1"></div> 
                        <div className="temperature weather_deets" id="day1_temp_range">Loading...</div>
                        <div className="windSpeed weather_deets" id="day1_wind">Loading...</div>
                        <div className="humidity weather_deets" id="day1_humid">Loading...</div>
                        <div className="weather_desc weather_deets" id="day1_desc">Loading...</div>
                    </div>
                    </div>
                </div>
                <div className = "col-md-2 icons">
                    <div className="mycard">    
                        <div className="row offset-md-4 image">
                        <img src="dots.png" alt="Weather Day 2" className="imgClass" id="img2"/> 
                        </div>
                        <div className="weather_info">
                            <div className="weather" id="day2"></div> 
                            <div className="temperature weather_deets" id="day2_temp_range">Loading...</div>
                            <div className="windSpeed weather_deets" id="day2_wind">Loading...</div>
                            <div className="humidity weather_deets" id="day2_humid">Loading...</div>
                            <div className="weather_desc weather_deets" id="day2_desc">Loading...</div>
                        </div>
                    </div>
                </div>
                <div className = "col-md-2 icons">
                    <div className="mycard">
                        <div className="row offset-md-4 image">
                        <img src="dots.png" alt="Weather Day 3" className="imgClass" id="img3"/> 
                        </div>
                        <div className="weather_info">
                            <div className="weather" id="day3"></div> 
                            <div className="temperature weather_deets" id="day3_temp_range">Loading...</div>
                            <div className="windSpeed weather_deets" id="day3_wind">Loading...</div>
                            <div className="humidity weather_deets" id="day3_humid">Loading...</div>
                            <div className="weather_desc weather_deets" id="day3_desc">Loading...</div>
                        </div>
                    </div>
                </div>
                <div className = "col-md-2 icons">
                    <div className="mycard">
                        <div className="row offset-md-4 image">
                        <img src="dots.png" alt="Weather Day 4" className="imgClass" id="img4"/> 
                        </div>
                        <div className="weather_info">
                            <div className="weather" id="day4"></div> 
                            <div className="temperature weather_deets" id="day4_temp_range">Loading...</div>
                            <div className="windSpeed weather_deets" id="day4_wind">Loading...</div>
                            <div className="humidity weather_deets" id="day4_humid">Loading...</div>
                            <div className="weather_desc weather_deets" id="day4_desc">Loading...</div>
                        </div>
                    </div>
                </div>
                <div className = "col-md-2 icons">
                    <div className="mycard">
                        <div className="row offset-md-4 image">
                        <img src="dots.png" alt="Weather Day 5" className="imgClass" id="img5"/> 
                        </div>
                        <div className="weather_info">
                            <div className="weather" id="day5"></div> 
                            <div className="temperature weather_deets" id="day5_temp_range">Loading...</div>
                            <div className="windSpeed weather_deets" id="day5_wind">Loading...</div>
                            <div className="humidity weather_deets" id="day5_humid">Loading...</div>
                            <div className="weather_desc weather_deets" id="day5_desc">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>  
            </div>
            <br></br>
        </div>
        
        );
    };
    

    const onloadData= () => {
        var url = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001a91006a69a344a2f5750f6bda75532d8&format=json&offset=0&limit=1000&filters[state]="+location;

        fetch(url)
        .then(response => {
            getData(response.json());
        })
        .catch(err => {
            console.error(err);
        });
    };

    const getData = (result) => {
        Promise.resolve(result).then(value =>{
            if (value) {
                if (value.records) getRecords(value.records);
                if (value.updated_date) getDate(value.updated_date);
            }
        });
    };
    
    function getDate(date){
        var update = new Date(date);
        const updatedEl = document.getElementById('updatedOn');
        if (updatedEl) updatedEl.innerHTML = update.toDateString();
    }

    const getRecords = (record) => {
        const tableBody = document.getElementById('market_price_body');
        const mandierror = document.getElementById('mandierror');
        if (tableBody) tableBody.innerHTML = '';
        if (mandierror) mandierror.innerHTML = '';

        if (!record || record.length === 0) {
            if (mandierror) mandierror.innerHTML = 'Sorry! Market is Closed Today';
            return;
        }
        for (let i = 0; i < record.length; i++) {
            const state = record[i].state;
            const distrcts = record[i].district;
            const market = record[i].market;
            const commodity = record[i].commodity;
            const variety = record[i].variety;
            const min_price = record[i].min_price;
            if (isNaN((min_price / 100))) {
                continue;
            }
            const max_price = record[i].max_price;
            const tTr = document.createElement('tr');
            
            tTr.innerHTML = '<td scope="row">' + state + '</td>\n' +
                '<td>' + distrcts + '</td>\n' +
                '<td>' + market + '</td>\n' +
                '<td>' + commodity + '</td>\n' +
                '<td>' + (min_price / 100) + ' - ' + (max_price / 100) + '</td>\n' +
                '<td>' + variety + '</td>\n';
            if (tableBody) tableBody.appendChild(tTr);
        }
    };
	const FarmerLinks = () => {
        return (
            <div className="card card_farmer ml-5">
                <h4 className="card-header">Actions</h4>
                <ul className="list-group">
                <li className="list-group-item">
                        <Link className="nav-link" to="/view">
                            View
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/add/vegetables">
                            Add
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/remove">
                            Remove
                        </Link>
                    </li>
					<li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`} >
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };
    const searchDistrict =() =>{
        const fillter = document.getElementById('search_input_dist').value.toUpperCase();
        const table = document.getElementById('market_price_body');
        const tr = table.getElementsByTagName('tr');
        for(let i=0; i<tr.length; i++){
            const td= tr[i].getElementsByTagName('td')[1];
            if(td){
                const textvale = td.textContent || td.innerHTML;
                if(textvale.toUpperCase().indexOf(fillter)>-1){
                    tr[i].style.display="";
                }else{
                    tr[i].style.display ="none";
                }
            }
        }
    }
    const searchCommodity =() =>{
        const fillter = document.getElementById('search_input_comm').value.toUpperCase();
        const table = document.getElementById('market_price_body');
        const tr = table.getElementsByTagName('tr');
        for(let i=0; i<tr.length; i++){
            const td_commodity= tr[i].getElementsByTagName('td')[3];
            if(td_commodity){
                const textvale_commodity = td_commodity.textContent || td_commodity.innerHTML;
                if(textvale_commodity.toUpperCase().indexOf(fillter)>-1){
                    tr[i].style.display="";
                }else{
                    tr[i].style.display ="none";
                }
            }
        }
    }
	const farmerInfo = () => {
        return (
            <div className="card card_farmer mb-5">
				<h3 className="card-header">Personal Details</h3>
				<ul className="list-group">
					<li className="list-group-item"> {name} </li>
					<li className="list-group-item"> {email} </li>
					<li className="list-group-item"> {location} </li>
					<li className="list-group-item"> {role === 1 ? "Farmer" : "Customer"} </li>
				</ul>
			</div>
        );
    };
    
    const GovApi= () => {
        return (
        <div id="govapi" >
        
        
        <div className="container-fluid p-3 fetch_data">
            <div className="row" >
                <div className="col-xl-12">
                    <h4 className="text-center mt-3 farmer_text">Price in Rupees per Kilogram </h4>
                    <h6 className="text-center mt-3 farmer_text">Updated On : <span id="updatedOn"></span></h6>
                    <div className="row">
                        <div className="col-md-4 offset-md-2">
                            <button className="btn btn_dashboard"  onClick={onloadData}> Fetch Data </button>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn_dashboard"  onClick={GetInfo}> Get Weather </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br>
        <div className="row">
            <div className="col-xl-6 search_box text-white">
                <input className="form-control" id="search_input_dist" type="text" placeholder="Search district mandi from your state" onKeyUp={searchDistrict}/>
            </div>
            <div className="col-xl-6 search_box text-white">
                <input className="form-control" id="search_input_comm" type="text" placeholder="Search specific vegetable or fruit ( commodity )" onKeyUp={searchCommodity}/>
            </div>
        </div>
        <br></br>
        <div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="bg-info text-white">
                        <tr>
                            <th scope="col">State</th>
                            <th scope="col">District</th>
                            <th scope="col">Market</th>
                            <th scope="col">Commodity</th>
                            <th scope="col">Price Range</th>
                            <th scope="col">Variety</th>                            
                        </tr>
                    </thead>
                    <tbody id="market_price_body">
                        <tr id="msg">
                            
                        </tr>
                    </tbody>
                </table>
		<div>
                    <h3 id="mandierror">
                         </h3>
                </div>
            </div>
        
        </div>
            
        </div>
        );
    };
    

	return (
        <Layout
            title={`Welcome to Kisaan Mitra ${name} !`} 
			className="container-fluid text-center"
        >
			
			<div className="row">
                <div className="col-md-12 offset-md-0">{WeatherApi()} </div> 

                <div className="col-md-2 offset-md-0">{FarmerLinks()}</div>
                <div className="col-md-8 offset-md-0">{GovApi()} </div>
                <div className="col-md-2 offset-md-0">{farmerInfo()}</div>
                
            </div>
           

        </Layout>
	)
};


export default FarmerDashboard;
