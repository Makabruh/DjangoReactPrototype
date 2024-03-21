import React from 'react';
import Register from './Register';
import Login from './Login';
import QueryButton from './QueryButton';
import QueryInput from './QueryInput';

function App() {

  return(
    <div className="App">
      <Register />
      <br />
      <Login />
      <br />
      <QueryInput />
    </div>
  );
  
}

export default App;



//Using class component rather than function
// class App extends React.Component {
//   state = {details: [], }

//   //componentDidMount does x
//   componentDidMount(){
//     let data;
//     //Get the data from the Django backend
//     //Then is a promise that takes the response as an argument
//     //Data is assigned to res.data
//     //Details is set to whatever data is returned
//     axios.get('http://localhost:8000')
//     .then(res => {
//         data = res.data;
//         this.setState({
//           details: data
//       });
//     })
//     //Catch errors and return blank
//     .catch(err => { })
//   }

//   render() {
//     return(
//       <div>
//         <header>Data from Django</header>
//         <hr></hr>
//         {this.state.details.length > 0 ? (
//           this.state.details.map((output, id) => (
//           <div key={id}>
//             <div>
//               <h2>{output.userName}</h2>
//               <h3>{output.password}</h3>
//               <h4>{output.userLevel}</h4>
//             </div>
//           </div>
//         ))
//         ) : (
//           <p>No data available</p>
//         )}
//       </div>
//     )
//   }

// }

// export default App;