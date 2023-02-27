import { Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminVacationService from "../../../Services/AdminVacationsService";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
    
    const [imagePreview, setImagePreview] = useState(null);
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());

    // Re-route to home if not registered or admin
    useEffect(() => {

        // Get user from store
        const user = authStore.getState().user;

        // if .role not admin or not logged-in
        if (user?.role !== 'Admin' || !authService.isLoggedIn()) {

            // navigate to login
            navigate("/home");

        }
    }, [navigate]);

    // OnSubmit adds new vacation
    async function send(vacation: VacationModel) {
        try {
            // Extract image from vacation.image
            vacation.image = (vacation.image as unknown as FileList)[0];

            // Use service for adding new vacation
            await adminVacationService.addVacation(vacation);
            notify.success("Vacation added successfully");

            // Return to vacations list
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // sets endDate input to minimum of startDate onChange
    const handleStartDateChange = (args: ChangeEvent<HTMLInputElement>) => {
        setStartDate(args.target.valueAsDate);
    };

    // navigate to vacation when user clicks back
    const handleBack = () => {
        navigate("/vacations");
    };

    // Show image preview
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePreview(reader.result);
        };
    };

    // variables for onChange date inputs  
    const startDateRegister = register("startDate", VacationModel.startDateValidation);
    const imageRegister = register("image", VacationModel.imageValidation);

    return (
        <div className="AddVacation">
            <div className="Title">
                Add
                <br />
                vacation
            </div>

            <div className="AddWrapper">
                <form onSubmit={handleSubmit(send)}>
                    <div className="input-container ic2">
                        <input
                            id="destination"
                            className="input"
                            type="text"
                            placeholder=" "
                            {...register("destination", VacationModel.destinationValidation)}
                        />
                        <div className="cut cut-short"></div>
                        <label htmlFor="destination" className="placeholder">
                            Destination
                        </label>
                        <span className="Error">
                            {formState.errors.destination?.message}
                        </span>
                    </div>

                    <div className="input-container ic2">
                        <input
                            id="description"
                            className="input"
                            type="text"
                            placeholder=" "
                            {...register("description", VacationModel.descriptionValidation)}
                        />
                        <div className="cut cut-short"></div>
                        <label htmlFor="description" className="placeholder">
                            Description
                        </label>
                        <span className="Error">
                            {formState.errors.description?.message}
                        </span>
                    </div>
                    <div className="input-container ic2">
                        <input
                            id="price"
                            className="input"
                            type="number"
                            placeholder=" "
                            {...register("price", VacationModel.priceValidation)}
                        />
                        <div className="cut cut-short"></div>
                        <label htmlFor="price" className="placeholder">
                            Price
                        </label>
                        <span className="Error">{formState.errors.price?.message}</span>
                    </div>
                    <div className="DateContainer">
                        <div className="input-container ic2">
                            <input
                                min={new Date().toISOString().substring(0, 10)}
                                id="startDate"
                                className="input"
                                type="date"
                                placeholder=" "
                                {...startDateRegister}
                                onChange={(e) => {
                                    handleStartDateChange(e);
                                    startDateRegister.onChange(e);
                                }}
                            />
                            <div className="cut cut-short"></div>
                            <label htmlFor="startDate" className="placeholder">
                                Start Date
                            </label>
                            <span className="StartError">
                                {formState.errors.startDate?.message}
                            </span>

                            <input
                                min={startDate.toISOString().substring(0, 10)}
                                id="endDate"
                                className="input"
                                type="date"
                                placeholder=" "
                                {...register("endDate", VacationModel.endDateValidation)}
                            />
                            <div className="cut cut-short"></div>
                            <label htmlFor="endDate" className="placeholderEnd">
                                End Date
                            </label>
                            <span className="EndError">
                                {formState.errors.endDate?.message}
                            </span>
                        </div>
                    </div>

                    <div className="ImageContainer">
                        <div className="ImageInput">
                            <Button variant="contained" component="label">
                                Upload Image
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    {...imageRegister}
                                    onChange={(e) => {
                                        handleImageChange(e);
                                        imageRegister.onChange(e);
                                    }} />
                            </Button>
                        </div>
                        {imagePreview && <img alt="vacation" src={imagePreview} />}
                        <span className="ImageError">{formState.errors.image?.message}</span>
                    </div>

                    <div className="BtnContainer">
                        <button className="submit">Add</button>
                        <button className="Back" onClick={handleBack}>
                            Back
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddVacation;