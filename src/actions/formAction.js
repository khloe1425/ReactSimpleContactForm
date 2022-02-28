import axios from "axios"
import { positions } from "react-alert";

export const SubmitForm = async (data, alert) => {
    try {
        let result = await axios({
            method: "POST",
            url: 'http://localhost:7000/form',
            data
        })
        alert.show("Success", { type: "success" })
        // show success alert
    } catch (error) {
        alert.show(error.response.data, { type: "error", offset: "150px" })
        // show error alert
    }

}
export const editForm = async (data, alert) => {
    try {
        let result = await axios({
            method: "PUT",
            url: 'http://localhost:7000/form',
            data
        })
        alert.show("Success ", { offset: "2450px" })
        //show success alert
    } catch (error) {
        alert.show(error.response.data, { type: "error" })
        //show error alert
    }

}
export const getFormById = async (id, formData) => {
    let result = await axios.get(`http://localhost:7000/form/${id}`);
    const { fullname, email, formId, description, issues } = result.data
    //
    formData.setFieldValue("email", email)
    formData.setFieldValue("name", fullname)
    formData.setFieldValue("ckContent", description)
    formData.setFieldValue("issues", issues)
    formData.setFieldValue("id", formId)
}
export const getAllForms = async (setFormList) => {
    let url = "http://localhost:7000/form";
    let result = await axios.get(url);
    setFormList(result.data);
}
export const deleteForm = async (id, alert, setFormList) => {
    try {
        await axios.delete(`http://localhost:7000/form/${id}`);
        alert.show("Success", { position: positions.TOP_RIGHT });
        setFormList(id);
    } catch (error) {
        alert.show(error.response.data, { position: positions.TOP_RIGHT })
    }


}