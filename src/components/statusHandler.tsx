import { RequestState } from "~/redux/slices/weatherSlice";

export default function StatusHandler(props:{status: RequestState}) {
    return (
        <div>
        {props.status === 'rejected' &&'Oh no, there was an error'}
        {props.status === 'pending' &&'Loading'}
        </div>
    )
}