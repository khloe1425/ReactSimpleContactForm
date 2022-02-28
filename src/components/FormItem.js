import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { deleteForm } from '../actions/formAction'
import { AlertContext } from '../App'

export default function FormItem({ item, setNewForm }) {
  const alert = useContext(AlertContext)
  return (
    <div className="card my-3">
      <div className="row">
        <div className="card-body  col-lg-10 col-md-8">
          <p>Full Name: {item.fullname}</p>
          <p>Email: {item.email}</p>
          <p>Issues: {item.issues}</p>
          <div>
            <p>Descripton : </p>
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
        </div>
        <div className=" card-body col-lg-2 col-md-4">
          <NavLink className="btn btn-success w-100 mb-2" to={`/edit/${item.formId}`}>Edit</NavLink>
          <button
            onClick={() => { deleteForm(item.formId, alert, setNewForm) }}
            className="btn btn-danger w-100 ">Delete</button>
        </div>
      </div>
    </div>
  )
}
