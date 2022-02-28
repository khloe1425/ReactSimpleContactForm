import React from 'react'

export default function AlertComponent({ showAlert, success, msg }) {

    return showAlert ? (<div className={`${success ? "alert alert-success" : "alert alert-danger"}`} role="alert">
        {msg}
    </div>
    ) : ""

}
