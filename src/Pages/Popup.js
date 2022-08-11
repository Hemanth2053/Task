import "./Popup.css"
import { useState } from "react";
import axios from 'axios'

const Dummy_data = [
  { Lable: "First Name", Value: "first_name", showing: true, selected: true },
  { Lable: "Last Name", Value: "last_name", showing: false, selected: false },
  { Lable: "Gender", Value: "gender", showing: false, selected: false },
  { Lable: "Age", Value: "age", showing: false, selected: false },
  { Lable: "Account Name", Value: "account_name", showing: true, selected: true },
  { Lable: "City", Value: "city", showing: false, selected: false },
  { Lable: "State", Value: "state", showing: false, selected: false },
];

function App() {
  const [data, setData] = useState(Dummy_data);
  const [addNewSchema, setAddNewSchema] = useState("");
  const [segmentName, SetSegmentName] = useState("")

  const initialState = {
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    account_name: "",
    city: "",
    state:"",
    
  };

  const [segmanetData, setSegmantData] = useState(initialState);

  const handleChange = (e) => {
    setSegmantData({ ...segmanetData, [e.target.name]: e.target.value });
  };

  const handleSchemaSubmit = (e) => {
    e.preventDefault();
    let changeData = [...data];

    changeData.forEach((d) => {
      if (d.Lable === addNewSchema) {
        d.showing = true;
      }
    });
    setData(changeData);
  };

  const handleRemoveSegment = (label) => {
    let removeData = [...data];

    removeData.forEach((d) => {
      if (d.Lable === label) {
        d.showing = false;
      }
    });

    setData(removeData);
  };

  const handleSaveSegment = async (e) => {
    e.preventDefault();
    const totalSegment = {
        segment_name : segmentName,
        schema : {...segmanetData}
    } 
    console.log(totalSegment)

   await axios.post("https://webhook.site/aae553f1-45f4-4bda-941c-2f3ebaa167e1", totalSegment)
    .then(res => console.log(res)).catch(er => console.log(er))
  }

  const handleCancel = (e) => {
    e.preventDefault();
  }
  return (
    <div className="comp">
        <h5>Saving Segment</h5>
        <label>Enter the name of the segment</label>
      <input placeholder="Segment Name" onChange={(e) => SetSegmentName(e.target.value)}></input>
      <p>To save your segment you need to add your schemas to build the query</p>
      <form>
        {data
          .filter((d) => d.showing === true)
          .map((d) => (
            <div className="cont" key={d.Lable}>
              <select className="sel" onChange={handleChange} name={d.Value}>
                <option className="option-val">{d.Lable}</option>
                {data
                  .filter((f) => !Object.keys(segmanetData).includes(f.Lable))
                  .map((k) => (
                    <option key={k.Lable}>{k.Lable}</option>
                  ))}
              </select>
              <button className="btn-one" onClick={() => handleRemoveSegment(d.Lable)}>-</button>
            </div>
          ))}
      </form>

      <form  onSubmit={handleSchemaSubmit}>
        <select className="form-cont" onChange={(e) => setAddNewSchema(e.target.value)}>
          {data.map((d) => (
            <option className="sel" key={d.Lable}>{d.Lable}</option>
          ))}
        </select>
        <button className="btn-one" type="submit">+Add new schema</button>
      </form>
      <div className="btn-cont">
        <button onclick={(e) => handleSaveSegment(e)} type="button" class="btn btn-success">Save the segment</button>
        <button onClick={(e) => handleCancel(e)} type="button" class="btn btn-outline-danger">Cancel</button>
      </div>
    </div>

  );
}

export default App;