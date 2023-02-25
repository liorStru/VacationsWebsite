import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminVacationService from "../../../Services/AdminVacationsService";
import notify from "../../../Utils/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());

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
    }

    return (

            <div className="AddVacation">

                <div className="Title">Add<br /> vacation</div>
                
                <div className="AddWrapper">

                    <form onSubmit={handleSubmit(send)}>

                        <div className="input-container ic2">
                            <input id="destination" className="input" type="text" placeholder=" " {...register("destination", VacationModel.destinationValidation)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="destination" className="placeholder">Destination</label>
                            <span className="Error">{formState.errors.destination?.message}</span>
                        </div>

                        <div className="input-container ic2">
                            <input id="description" className="input" type="text" placeholder=" " {...register("description", VacationModel.descriptionValidation)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="description" className="placeholder">Description</label>
                            <span className="Error">{formState.errors.description?.message}</span>
                        </div>
                        <div className="input-container ic2">
                            <input id="price" className="input" type="number" placeholder=" " {...register("price", VacationModel.priceValidation)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="price" className="placeholder">Price</label>
                            <span className="Error">{formState.errors.price?.message}</span>
                        </div>

                        <div className="input-container ic2">
                            <input id="startDate" className="input" type="date" placeholder=" "  min={new Date().toISOString().substring(0, 10)} {...register("startDate", VacationModel.startDateValidation)} onChange={handleStartDateChange}  />
                            <div className="cut cut-short"></div>
                            <label htmlFor="startDate" className="placeholder">Start Date</label>
                            <span className="Error">{formState.errors.startDate?.message}</span>
                        </div>

                        <div className="input-container ic2">
                            <input id="endDate" className="input" type="date" placeholder=" " {...register("endDate", VacationModel.endDateValidation)} min={startDate.toISOString().substring(0, 10)} />
                            <div className="cut cut-short"></div>
                            <label htmlFor="endDate" className="placeholder">End Date</label>
                            <span className="Error">{formState.errors.endDate?.message}</span>
                        </div>

                        <div className="ImageContainer">
                            <label>Image: </label>
                            <input type="file" accept="image/*" {...register("image", VacationModel.imageValidation)} />
                            <span className="Error">{formState.errors.image?.message}</span>
                        </div>

                        <button className="submit">Add</button>
                        <button className="Back" onClick={handleBack}>Back</button>

                    </form>
                </div>
            </div>
        );
}

export default AddVacation;
