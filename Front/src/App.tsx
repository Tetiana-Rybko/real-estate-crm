import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        {/*  страницы */}
      </div>

    </div>
  );
}

export default App;
