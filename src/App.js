import Main from "./components/Main";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="">
      <Navbar />
      <hr />
      <div className="flex items-center justify-center">
        <Main />
      </div>
    </div>
  );
}

export default App;
