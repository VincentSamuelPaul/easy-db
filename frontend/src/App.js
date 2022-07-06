import './App.css';

// File imports --
import Mainpage from './components/Mainpage';

function App() {

  // const [query, setQuery] = useState();
  // const [da, setData] = useState([]);

  // const get = async () => {
  //   const response = await fetch('http://127.0.0.1:8000/api/post/', {
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json',
  //     },
  //     body:JSON.stringify({query:query})
  //   });
  //   const data = await response.json();
  //   if (response.status === 200) {
  //     setData(data);
  //     console.log(data);
  //   }
  // }

  return (
    <div className="App">
        <Mainpage/>
    </div>
  );
}

export default App;
