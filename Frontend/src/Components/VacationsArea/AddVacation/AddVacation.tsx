import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AdminVacationModel from "../../../Models/AdminVacationModel";
import VacationModel from "../../../Models/VacationModel";
import adminVacationService from "../../../Services/AdminVacationsService";
import notify from "../../../Utils/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    // const { register, handleSubmit, formState } = useForm<AdminVacationModel>();
    // const navigate = useNavigate();
    // const [startDate, setStartDate] = useState(new Date());
    // const formRef = useRef(null);

    //  // OnSubmit adds new vacation 
    // async function send(vacation: AdminVacationModel) {

    //     try {

    //         // Extract image from vacation.image
    //         vacation.image = (vacation.image as unknown as FileList)[0];

    //         // Use service for adding new vacation
    //         await adminVacationService.addVacation(vacation);
    //         notify.success("Vacation added successfully");

    //         // Return to vacations list
    //         navigate("/vacations");
    //     }
    //     catch (err: any) {
    //         notify.error(err);
    //     }

    // }
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const formRef = useRef(null);

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

    // Clears form on click
    const handleClear = () => {
        formRef.current.reset();
    };

    return (

        <div className="AddVacation Box">

            <h2>Add Vacation</h2>

            <form onSubmit={handleSubmit(send)} ref={formRef}>

                {/* <label>Destination: </label> */}
                <input type="text" placeholder="Destination.." {...register("destination", AdminVacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                {/* <label>Description: </label> */}
                <input type="text" placeholder="Description.." {...register("description", AdminVacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                {/* <label>Start Date: </label> */}
                <input type="date" placeholder="Start date.." {...register("startDate", AdminVacationModel.startDateValidation)} onChange={handleStartDateChange} min={new Date().toISOString().substring(0, 10)} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                {/* <label>End Date: </label> */}
                <input type="date" placeholder="End date.." {...register("endDate", AdminVacationModel.endDateValidation)} min={startDate.toISOString().substring(0, 10)} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                {/* <label>Price: </label> */}
                <input type="number" step="0.01" placeholder="Price.." {...register("price", AdminVacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", AdminVacationModel.imageValidation)} />
                <span className="Err">{formState.errors.image?.message}</span>

                <button>Add</button>
                <button type="button" onClick={handleClear}>Clear</button>

            </form>
        </div>
    );
}

export default AddVacation;
