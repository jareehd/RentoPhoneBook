import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactCard from "./ContactCard";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const url = '/contact';

  const onFilterPost = async () => {
    
    var Axios
    if ( name || email ) {
      
      Axios = axios.create({
        baseURL: url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
            name,
            email
        },
      });
    } else {
        Axios = axios.create({
            baseURL: url,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
    }

      try {
        const res = await Axios.get();
        setItems(res.data);
      } catch (e) {
        alert(e)
        console.log(e);
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
        setPage(result.data.currentPage)
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
        
        <div >
          
        <TextField
            variant="outlined"
            margin="normal"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={(event) => {
                setName(event.target.value)
            }}
          />

        <TextField
            variant="outlined"
            margin="normal"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(event) => {
                setEmail(event.target.value)
            }}
          />
        
            <Button
            variant="contained"
            margin='normal'  
            color="primary"
            onClick={onFilterPost}
          >
            Filter By Email / Name
          </Button>
        </div>

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