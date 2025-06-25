import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DesignGallery() {
  const [designs, setDesigns] = useState([]);
  const [error, setError] = useState(null);


