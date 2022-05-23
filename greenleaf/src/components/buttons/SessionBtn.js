export default function SessionBtn() {
  async function checkSession() {
    const url = "http://www.sabox.dk/backend/api.php?checksession";
    const response = await fetch(url);
    const data = await response.text();
    console.log(data);
  }

  return (
    <>
      <button onClick={checkSession}>check session</button>
    </>
  );
}
