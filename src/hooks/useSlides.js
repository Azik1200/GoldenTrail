import { useEffect, useState } from 'react';
import { fetchSlides } from '../api/slides';

export default function useSlides() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetchSlides()
      .then((data) => setSlides(data))
      .catch((err) => console.error(err));
  }, []);

  return slides;
}
