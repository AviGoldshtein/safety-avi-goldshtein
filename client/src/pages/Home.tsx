import LayoutMain from "../layouts/LayoutMain"
import EventForm from "../components/EventForm/EventForm"


export default function Home(){
    return(
        <div>
            <LayoutMain>
                <EventForm />
            </LayoutMain>
        </div>
    )
}