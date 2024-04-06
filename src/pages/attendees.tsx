import { useParams } from "react-router-dom";
import { AttendeeList } from "../components/attendee-list";
import { EventsList } from "../components/events-list";

export default function Attendees () {
    const { eventId } = useParams();

    if (!eventId) return <EventsList />;

    return <AttendeeList eventId={eventId!}/>
}