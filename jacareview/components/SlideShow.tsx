import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface SlideshowProps {
  images: any;
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isDragging, setDragging] = useState(false);
  const [{ x, scale }, set] = useSpring(() => ({
    x: 0,
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const mouseX = e.clientX;
      set({ x: mouseX });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    set({ x: 0, scale: 1 });
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative overflow-hidden"
    >
      {images.map((img:any, i:any) => (
        <animated.div
          key={i}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundImage: `url(${img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            willChange: 'transform',
            transform: x.to((val) => `translate3d(${val}px, 0, 0) scale(${scale})`),
          }}
          className="w-full h-full absolute top-0 left-0 bg-cover bg-center transform"
        />
      ))}
    </div>
  );
};

export default Slideshow;
