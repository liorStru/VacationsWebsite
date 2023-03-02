import { Button } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminVacationService from "../../../Services/AdminVacationsService";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const [imagePreview, setImagePreview] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const formRef = useRef(null);

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

    useEffect(() => {

        // Get vacation for update form
        adminVacationService.getOneVacation(+params.vacationId)
            .then(vacation => {

                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);

                // Changing date format to set correct date
                const startDate = new Date(vacation.startDate);
                startDate.setDate(startDate.getDate() + 1);
                const formattedStartDate = startDate.toISOString().substring(0, 10);
                setValue("startDate", formattedStartDate);

                // Changing date format to set correct date
                const endDate = new Date(vacation.endDate);
                endDate.setDate(endDate.getDate() + 1);
                const formattedEndDate = endDate.toISOString().substring(0, 10);
                setValue("endDate", formattedEndDate);

                setValue("price", vacation.price);
                setVacation(vacation);

            })
            .catch(err => notify.error(err));
    }, [params, setValue]);

    // activated OnSubmit updates backend vacation
    async function send(vacation: VacationModel) {
        try {
            // Extract image from vacation.image
            vacation.image = (vacation.image as unknown as FileList)[0];

            // Use service for updating vacation
            await adminVacationService.updateVacation(vacation);
            notify.success("Vacation updated successfully");

            // Return to vacations list
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    // sets endDate input to minimum of startDate onChange
    const handleStartDateChange = (args: ChangeEvent<HTMLInputElement>) => {
        setStartDate(args.target.valueAsDate);
    };

    // Clears form on click
    const handleClear = () => {
        formRef.current.reset();
    };

    // navigate to vacation when user clicks back
    const handleBack = () => {
        navigate("/vacations");
    }

    // Show image preview
    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePreview(reader.result);
        };
    };

    // variables for onChange date inputs  
    const startDateRegister = register("startDate", VacationModel.startDateValidation);

    return (

        <div className="EditVacation">
            <div className="Title">Edit<br /> vacation</div>

            <div className="EditWrapper">

                <form onSubmit={handleSubmit(send)} ref={formRef}>

                    {/* Hiding id on the form in hidden input */}
                    <input type="hidden" {...register("vacationId")} />

                    <div className="input-container ic2">
                        <input
                            className="input"
                            type="text"
                            placeholder=" "
                            {...register("destination", VacationModel.destinationValidation)}
                        />
                        <div className="cut cut-short"></div>
                        <label className="placeholder">Destination</label>
                        <span className="Error">{formState.errors.destination?.message}</span>
                    </div>

                    <div className="input-container ic2">
                        <input
                            className="input"
                            type="text"
                            placeholder=" "
                            {...register("description", VacationModel.descriptionValidation)}
                        />
                        <div className="cut cut-short"></div>
                        <label className="placeholder">Description</label>
                        <span className="Error">{formState.errors.description?.message}</span>
                    </div>

                    <div className="input-container ic2">
                        <input
                            className="input"
                            type="number"
                            placeholder=" "
                            {...register("price", VacationModel.priceValidation)}
                        />
                        <div className="cut cut-short"></div>
                        <label className="placeholder">Price</label>
                        <span className="Error">{formState.errors.price?.message}</span>
                    </div>

                    <div className="DateContainer">
                        <div className="input-container ic2">
                            <input
                                className="input"
                                type="date"
                                placeholder=" "
                                {...startDateRegister}
                                onChange={(e) => {
                                    handleStartDateChange(e);
                                    startDateRegister.onChange(e);
                                }} />
                            <div className="cut cut-short"></div>
                            <label className="placeholder">Start Date</label>
                            <span className="StartError">{formState.errors.startDate?.message}</span>

                            <input
                                className="input"
                                type="date"
                                placeholder=" "
                                {...register("endDate", VacationModel.endDateValidation)} min={startDate.toISOString().substring(0, 10)}
                            />
                            <div className="cut cut-short"></div>
                            <label className="placeholderEnd">End Date</label>
                            <span className="EndError">{formState.errors.endDate?.message}</span>
                        </div>
                    </div>
                    <div className="ImageContainer">
                        <div className="ImageInput">
                            <Button variant="contained" component="label">
                                Upload Image
                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    {...register("image")}
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </div>
                        <img alt="vacation" src={imagePreview || vacation?.imageName} />
                    </div>

                    <button type="button" className="Back" onClick={handleClear}>Clear</button>
                    <button className="Back" onClick={handleBack}>Back</button>
                    <button className="submit">Update</button>

                </form>

            </div>
        </div>
    );
}

export default EditVacation;
