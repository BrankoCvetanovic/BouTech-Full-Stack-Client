import { useState, useEffect } from "react";
import adIcon1 from "../assets/webp_0408_pspcG517upgradeSH.webp";
import adIcon2 from "../assets/webp_0408_TopDealsSH.webp";
import adIcon3 from "../assets/1920x660_sm@2x.jpg";
import LinearProgress from "@mui/material/LinearProgress";

export default function Slider() {
  const images = useState([adIcon1, adIcon2, adIcon3])[0];
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lastIndex = images.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        if (oldProgress === 97.5) {
          setIndex(index + 1);
        }
        return Math.min(oldProgress + 2.5, 100);
      });
    }, 238);
    return () => {
      clearInterval(timer);
    };
  }, [index]);

  return (
    <section className="slider-container">
      <div className="slider">
        {images.map((image, imageIndex) => {
          let position = "nextSlide";
          if (imageIndex === index) {
            position = "activeSlide";
          }
          if (
            imageIndex === index - 1 ||
            (index === 0 && imageIndex === images.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article key={image} className={position}>
              <img src={image} className="img" />
              <div className="progress-bar">
                <LinearProgress
                  color="inherit"
                  variant="determinate"
                  value={progress}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
