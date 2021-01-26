import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactCard from "./ContactCard";

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const url = 'http://localhost:5000/contact';

  const onFilterPost = async () => {
    if (page || name || email) {
      const Axios = axios.create({
        baseURL: url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
            page, 
            name,
            email
        },
      });

      try {
        const res = await Axios.get();
        setItems(res.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const Axios = axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const fetchData = async () => {
      try {
        const result = await Axios.get();
        setItems(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <h1> Loading... </h1>
  ) : (
      <div>
        
        

        {items.contacts.map((item) => (
            <ContactCard
              key={item._id}
              contact={item}
            ></ContactCard>
        ))}
      </div>
      
  );
};

export default LandingPage;