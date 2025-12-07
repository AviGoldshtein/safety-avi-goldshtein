import LayoutMain from "../layouts/LayoutMain"
import EventFormWizard from "../components/EventFormWizard/EventFormWizard"


export default function NewEvent(){
    return(
        <div>
            <LayoutMain>
                <EventFormWizard />
            </LayoutMain>
        </div>
    )
}