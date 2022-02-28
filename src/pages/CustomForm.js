import React, { useContext, useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useParams } from 'react-router-dom';
import { getFormById, SubmitForm } from '../actions/formAction';
import AlertComponent from '../components/AlertComponent';
import { useAlert } from 'react-alert';
import { AlertContext } from '../App';
const options = [
    { text: "Please select one option", value: "" },
    { text: "Truy vấn", value: "Truy vấn" },
    { text: "Phản hồi", value: "Phản hồi" },
    { text: "Khiếu nại", value: "Khiếu nại" },
    { text: "Khác", value: "Khác" }
]
const Span = styled.span`
    font-size=10px;
    color:red;
    opacity:1
`
export default function CustomForm({ action, callback }) {
    const alert = useContext(AlertContext)
    let params = useParams();
    const formik = useFormik({
        initialValues: {
            name: 'Trung Anh',
            email: '',
            ckContent: '',
            issues: '',
            id: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please fill out this field").matches(/^[^0-9]+$/, "Invalid Name"),
            //by using ^ and $ to signify start and end of string: , ^ is : NOT
            ckContent: Yup.string().required("Please fill out this field"),
            email: Yup.string().email('Invalid email address').required("Please fill out this field"),
            issues: Yup.string().required("Please select one option")
        }),
        onSubmit: value => {
            const { name, email, ckContent, issues, id } = value
            callback({ fullname: name, email, description: ckContent, issues, formId: id },alert)
        }
    })
    const inputDescHandle = (event, editor) => {
        formik.setFieldValue("ckContent", editor.getData());
    }
    const inputOnBlurHandle = (e, editor) => {
        formik.setFieldTouched("ckContent", true)
    }
    useEffect(() => {
        if (params.id) {
            getFormById(params.id, formik)
        }
    }, [])
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="mb-4">
                <div className="mb-3">
                    <div>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name" placeholder=""
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Span displayError>{formik.touched.name && formik.errors.name}</Span>

                    </div>
                </div>
                <div className="mb-3">
                    <div>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Span displayError>{formik.touched.email && formik.errors.email}</Span>

                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="options" className="form-label">Choose your problem</label>
                    <select className="form-select" aria-label="Default select example"
                        id="issues"
                        value={formik.values.issues}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {options.map((item, index) => (
                            <option value={item.value} key={index}>{item.text}</option>
                        ))}
                    </select>
                    <Span displayError>{formik.touched.issues && formik.errors.issues}</Span>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Description</label>
                    <CKEditor editor={ClassicEditor} data={formik.values.ckContent} id="ckContent"
                        onChange={inputDescHandle}
                        onBlur={inputOnBlurHandle}

                    />
                    <Span displayError>{formik.touched.ckContent && formik.errors.ckContent}</Span>
                </div>
                <button type='submit' className='btn btn-success'>{action}</button>
                <NavLink to="/list" className={"btn btn-danger mx-4"}>All Form</NavLink>
            </form>
            {/* <AlertComponent success={success} showAlert={showAlert} msg={msg} /> */}
        </div>
    )
}
