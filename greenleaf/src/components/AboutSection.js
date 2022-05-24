import img from "../assets/IMG_0046.JPG";

//A component that display some information about GreenLeaf.
export default function AboutSection() {
  return (
    <div className="aboutContent">
      <div className="aboutText">
        <p>
          Do you want to help reduce food waste in the world? Do you want to
          make a good deal in the process?
        </p>
        <h2>Making a difference doesn't have to be expensive.</h2>
        <p>
          Here at GreenLeaf, you can offer your food that is close to expiring,
          giving it a second chance. Of course, you can also benefit from the
          offers and bring home premium food, at budget price!{" "}
        </p>
      </div>

      <img src={img} alt="Nice and attractive food" />
    </div>
  );
}
