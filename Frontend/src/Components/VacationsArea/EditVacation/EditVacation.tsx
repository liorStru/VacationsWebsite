import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminVacationService from "../../../Services/AdminVacationsService";
import notify from "../../../Utils/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const [startDate, setStartDate] = useState(new Date());
    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const formRef = useRef(null);


    useEffect(() => {
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
    }, []);

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

    return (
        <div className="EditVacation Box">

            <h2>Update Vacation</h2>

            <form onSubmit={handleSubmit(send)} ref={formRef}>

                {/* Hiding id on the form in hidden input */}
                <input type="hidden" {...register("vacationId")} />

                {/* <label>Destination: </label> */}
                <input type="text" placeholder="Destination.." {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                {/* <label>Description: </label> */}
                <input type="text" placeholder="Description.." {...register("description", VacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                {/* <label>Start Date: </label> */}
                <input type="date" placeholder="Start date.." {...register("startDate", VacationModel.startDateValidation)} onChange={handleStartDateChange}  />
                <span className="Err">{formState.errors.startDate?.message}</span>

                {/* <label>End Date: </label> */}
                <input type="date" placeholder="End date.." {...register("endDate", VacationModel.endDateValidation)} min={startDate.toISOString().substring(0, 10)} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                {/* <label>Price: </label> */}
                <input type="number" step="0.01" placeholder="Price.." pattern="$" {...register("price", VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />
                <span className="ImagePreview">
                    <img alt="vacation" src={vacation?.imageName} />
                </span>

                <button>Update</button>
                <button type="button" onClick={handleClear}>Clear</button>

            </form>
        </div>
    );
}

export default EditVacation;
