import Select from "react-select";

const Home = () => {

  const options = [
    {
      value: 'Default',
      label: 'Please choose an option'
    },
    {
      value: 'room1',
      label: 'Room 1'
    },
    {
      value: 'room2',
      label: 'Room 2'
    },
    {
      value: 'room3',
      label: 'Room 3'
    },
  ]

  return <div>
    <div>
      <input/>
      <Select options={options} defaultValue={options[0]}/>
      <button>hejsan222</button>
    </div> 
  </div>
}

export default Home;