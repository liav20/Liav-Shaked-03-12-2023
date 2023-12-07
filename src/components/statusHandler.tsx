import { RequestState } from "~/redux/slices/weatherSlice";
import LoadingAnimation from "./animations/loadingAnimation";

export default function StatusHandler(props:{status: RequestState}) {
    return (
        <div>
        {props.status === 'rejected' &&'Oh no, there was an error in the Request Api'}
        {props.status === 'pending' &&<LoadingAnimation/>}
        {props.status === 'fulfilled' &&'Oh no, there was an error in the response API.'}
        </div>
    )
}