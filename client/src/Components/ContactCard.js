import React from 'react'

export default function ContactCard(props){
    return (
        <div>
          { props.contact.name } { props.contact.email } { props.contact.contactNumber }
        </div>
    )
}