import AddItem from "./components/AddItem";
import NewBill from "./components/NewBill";
import MyBills from "./components/MyBills";
import Sales from "./components/Sales";

const App = () => {
  return (
    <div className="App">
      <AddItem />
      <NewBill />
      <MyBills />
      <Sales />
    </div>
  );
};

export default App;
