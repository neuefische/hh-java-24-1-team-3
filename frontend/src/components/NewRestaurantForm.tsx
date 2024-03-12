import React, {FormEvent, useState} from "react";
import "./NewRestaurantForm.css"
import axios from "axios";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {Restaurant, RestaurantAddress} from "../types/Restaurant.ts";

type Input = {
    title: string,
    city: string,
    cuisine: string,
    address: RestaurantAddress
}

type NewRestaurantFormProps = {
    saveNewRestaurant: React.Dispatch<React.SetStateAction<Restaurant[]>>
}

const initialErrorState = {
    title: '',
    city: '',
    cuisine: '',
    address: {
        address: '',
        number: ''
    }
};

const initialFormValue = {title: "", city: "", cuisine: "", address: {address: "", number: ""}}

const formDataSchema = yup.object().shape({
    title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters').max(100, 'Title must be at most 100 characters'),
    city: yup.string().required('City is required').min(3, 'City must be at least 3 characters').max(100, 'City must be at most 100 characters'),
    cuisine: yup.string().required('Cuisine is required').min(3, 'Cuisine must be at least 3 characters').max(50, 'Cuisine must be at most 50 characters'),
    address: yup.object().shape({
        address: yup.string().required('Address is required').min(3, 'Address must be at least 3 characters').max(100, 'Address must be at most 100 characters'),
        number: yup.string().required('Number is required').min(1, 'Number must be at least 1 character').max(5, 'Number must be at most 5 characters')
    })
});

export default function NewRestaurantForm(props: Readonly<NewRestaurantFormProps>) {

    const [formData, setFormData] = useState<Input>(initialFormValue)
    const [submittedFormData, setSubmittedFormData] = useState<Input[]>([])
    const [errors, setErrors] = useState(initialErrorState)
    const navigate = useNavigate()

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        formDataSchema.validate(formData, {abortEarly: false})
            .then(() => {
                saveNewRestaurant();
                setFormData(initialFormValue)
                setErrors(initialErrorState);
            })
            .catch((validationErrors: yup.ValidationError) => {
                const errors: {
                    title: string;
                    city: string;
                    cuisine: string;
                    address: { address: string; number: string; };
                } = {
                    title: '',
                    city: '',
                    cuisine: '',
                    address: {
                        address: '',
                        number: ''
                    }
                };
                validationErrors.inner.forEach((currentError) => {
                    if (currentError.path === 'address.address' || currentError.path === 'address.number') {
                        if (!errors.address) {
                            errors.address = {
                                address: '',
                                number: ''
                            };
                        }
                        //@ts-ignore
                        errors.address[currentError.path.split('.')[1]] = currentError.message;
                    } else {
                        //@ts-ignore
                        errors[currentError.path] = currentError.message;
                    }
                });
                setErrors(errors);
            });
    }

    function saveNewRestaurant() {
        axios.post("/api/restaurants", formData)
            .then((response) => {
                console.log(response.data)
                setSubmittedFormData([...submittedFormData, formData])
                props.saveNewRestaurant((prevState) => [...prevState, response.data])
                navigate("/")

            })
            .catch((error) => console.log(error.message))
    }

    return (
        <form onSubmit={handleSubmit} >
            <h3>New Restaurant</h3>
            <label>Title:
                <input
                    type={"text"}
                    value={formData.title}
                    onChange={event =>
                        setFormData({...formData, title: event.target.value})}
                    maxLength={100}
                    required={true}
                />
                {errors.title && <p>{errors.title}</p>}
            </label>
            <label>City:
                <input
                    type={"text"}
                    value={formData.city}
                    onChange={event => setFormData({...formData, city: event.target.value})}
                    maxLength={100}
                    required={true}
                />
                {errors.city && <p>{errors.city}</p>}
            </label>
            <label>Cuisine:
                <input
                    type={"text"}
                    value={formData.cuisine}
                    onChange={event => setFormData({...formData, cuisine: event.target.value})}
                    maxLength={50}
                    required={true}
                />
                {errors.cuisine && <p>{errors.cuisine}</p>}
            </label>
            <div className={"address-wrapper"}>
                <label>Address:
                    <input
                        type={"text"}
                        value={formData.address.address}
                        onChange={event => setFormData({
                            ...formData,
                            address: {...formData.address, address: event.target.value}
                        })}
                        maxLength={100}
                        required={true}
                    />
                    {errors.address && <p>{errors.address.address}</p>}
                </label>
                <label>Number:
                    <input
                        type={"text"}
                        value={formData.address.number}
                        onChange={event => setFormData({
                            ...formData,
                            address: {...formData.address, number: event.target.value}
                        })}
                        maxLength={5}
                        required={true}
                    />
                    {errors.address && <p>{errors.address.number}</p>}
                </label>
            </div>
            <button type={"submit"}>Add restaurant</button>
        </form>
    );
}
