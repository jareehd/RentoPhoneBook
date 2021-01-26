import React from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios'

export default function ContactCard(props){

    const del = async () => { 
        // const url1 ='http://localhost:5000'
        const url = `/contact/${props.contact._id}`
        const Axios = axios.create({
            baseURL: url,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        await Axios.delete();
    }

    return (
        <div styles={{margin:'40px' }}>
          { props.contact.name } { props.contact.email } { props.contact.contactNumber }
          <Button 
            variant="contained"
            margin='normal'  
            color="Secondary"
            onClick = {del}
          >
            Delete
          </Button>
        </div>
    )
}