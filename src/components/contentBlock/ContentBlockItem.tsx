
//Types
import { CompetitionLocation } from "../../assets/types/competitionTypes";
//Components
import OrangeButton  from "../buttons/OrangeButton";
import RedButton from "../buttons/RedButton";
import GreenButton from "../buttons/GreenButton";

interface Props {
    competitionGroup: CompetitionLocation
}

const ContentBlockItem: React.FC<Props> = (props) => {
    const { competitionGroup } = props;

    return (
        <div className="flex flex-row text-l font-bold items-center justify-between">
            <h3>{`Skupina`}</h3>
            <div>
                <OrangeButton 
                    buttonType="button"
                    buttonText="Upraviť skupinu"
                    buttonName="edit"
                    size="sm"
                    clickAction={console.log(`Click`)}
                />
                <RedButton
                    buttonType="button"
                    buttonText="Zmazať skupinu"
                    buttonName="delete"
                    size="sm"
                    clickAction={console.log(`Click`)}
                />
            </div>                    
        </div>
    );
};
export default ContentBlockItem;