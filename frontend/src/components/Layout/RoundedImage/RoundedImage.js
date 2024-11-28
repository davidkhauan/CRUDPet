function RoundedImage({ src, alt, width }) {
    const sizeClass = width === "px75" ? "rounded-circle" : "";
  
    return (
      <img
        className={`img-thumbnail ${sizeClass}`}
        src={src}
        alt={alt}
        style={{
          width: width === "px75" ? "75px" : "200px",
          height: width === "px75" ? "75px" : "200px",
        }}
      />
    );
  }
  
  export default RoundedImage;
  