import React, { useState, useEffect } from "react";

function App() {
  const [imge, setImages] = useState([]);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setImages(data.data));
  }, []);

  //returns all of the product images
  return (
    <>
      {imge.map((image) => {
        return <img src={image.imageSrc} />;
      })}
    </>
  );
}

export default App;
