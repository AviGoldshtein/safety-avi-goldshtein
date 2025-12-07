import LayoutMain from "../layouts/LayoutMain"
import { OverViewContent } from "../components/OverViewContent/OverViewContent"


export default function OverView(){
    return(
        <div>
            <LayoutMain>
                <OverViewContent />
            </LayoutMain>
        </div>
    )
}