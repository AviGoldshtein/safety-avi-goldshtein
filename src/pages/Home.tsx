import LayoutMain from "../layouts/LayoutMain"
import EventFormWizard from "../components/EventFormWizard/EventFormWizard"


export default function Home(){
    return(
        <div>
            <LayoutMain>
                <EventFormWizard />
            </LayoutMain>
        </div>
    )
}