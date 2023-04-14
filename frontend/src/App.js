// import React, {Component } from 'react';
// import "./App.css"

// class Home extends Component{
//  state = {
//     show: false,
//     data: [],
//     rating: 1,
//  }
//  componentDidMount = () =>{
//     // write code
//  }

//  handleGetData = () =>{

//  }
//  handleApply = async(id) =>{
//     //code
//  }
//  handleRating = (e) =>{
//     //code
//  }
//  handleAddRating = async(id)=>{
//     //code
//  }
//  handleDrop = async(id)=>{
//     //code
//  }
//  render(){
import React, { Component } from 'react';
import './App.css';

class Home extends Component {
  state = {
    show: false,
    data: [],
    rating: 1,
  };

  componentDidMount = async () => {
    try {
      const response = await this.handleGetData();
      this.setState({ data: response.data });
    } catch (error) {
      console.error(error);
    }
  };
   
 
  handleGetData = async () => {
    // Example implementation of a function to get data from the backend
    const response = await fetch('http://localhost:8001/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    this.setState.data=response.stringify()
  };

  handleApply = async (id) => {
    // Example implementation of a function to apply for a course
    try {
      const response = await fetch(`/api/courses/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = this.state.data.map((item) =>
        item.id === id ? { ...item, enrolled: true } : item
      );
      this.setState({ data: updatedData });
    } catch (error) {
      console.error(error);
    }
  };

  handleRating = (e) => {
    this.setState({ rating: e.target.value });
  }; 

  handleAddRating = async (id) => {
    // Example implementation of a function to add a rating for a course
    try {
      const response = await fetch(`/api/courses/${id}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: this.state.rating }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = this.state.data.map((item) =>
        item.id === id ? { ...item, ratings: [...item.ratings, this.state.rating] } : item
      );
      this.setState({ data: updatedData });
    } catch (error) {
      console.error(error);
    }
  };

  handleDrop = async (id) => {
    // Example implementation of a function to drop a course
    try {
      const response = await fetch(`/api/courses/${id}/drop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = this.state.data.map((item) =>
        item.id === id ? { ...item, enrolled: false } : item
      );
      this.setState({ data: updatedData });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return(
        <div className="home">
            <header>
                <h2>ABC Learning</h2>
            </header>
            {/*write your code */}
            <div className="cardContainer">
                <div className="card">
                    <ul>
                    
                    {
                      <>
                        <div className="header">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li>
                                <li>Rate:
                                <select className="rating" name="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                <button className="rate">Add</button>
                                </li>
                                <button className="drop">Drop</button>
                            </li>
                            <li><button className="btn">Apply</button></li>
                        </div>
                        <div className="footer">
                        <li></li>
                        </div>
                        </> }

                    </ul>
                    
                </div>
            </div>
        </div>
    );
 }
}

export default Home;

