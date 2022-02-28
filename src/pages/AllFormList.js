import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getAllForms } from '../actions/formAction';
import FormItem from '../components/FormItem';
export default function AllFormList() {
    const [formList, setFormList] = useState([])
    useEffect(() => {
        getAllForms(setFormList);
    }, [])
    const deleteForm = (id) => {
        let newFormList = formList.filter(item => item.formId !== id);
        setFormList(newFormList);
    }

    return (
        <div className='mt-4'>
            <NavLink to="/" className={"btn btn-success"}>Back to Home</NavLink>
            {formList.map((item, index) => <FormItem item={item} key={item.formId} setNewForm={deleteForm} />)}
        </div>
    )
}
