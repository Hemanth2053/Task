
import './App.css';
import Popup from './Pages/Popup';
import { IoIosArrowBack } from 'react-icons/io'

function App() {
  return (
    <div className="App">

    <nav class="navbar bg-primary">
      <div class="container-fluid">
        {/* <IoIosArrowBack/> */}
        <h4>View Audience</h4>
      </div>
    </nav>
      <div class="butto">  
      <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Segment
      </button>
      </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
           <Popup/>
            
         </div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default App;
