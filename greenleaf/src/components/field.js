import { useState, useEffect } from "react";
import "../App.css";

export default function Field() {
  const [tableName, setTableName] = useState("");

  async function getPosts() {
    const url = `http://localhost:3000/Documents/GitHub/Webudvikling/Project/Test/preapp/src/Backend/api.php?table=${tableName}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data["data"]);
    console.log(url);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(tableName);
    getPosts();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="field"
          placeholder="Table name"
          onChange={(e) => {
            setTableName(e.target.value);
            console.log(tableName);
          }}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
