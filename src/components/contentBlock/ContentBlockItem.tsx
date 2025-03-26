
//Types
import { CompetitionLocation } from "../../assets/types/competitionTypes";
//Components
import OrangeButton  from "../buttons/OrangeButton";
import RedButton from "../buttons/RedButton";

interface Props {
    compLocation: CompetitionLocation
    handleClickButton: () => void
}

const ContentBlockItem: React.FC<Props> = (props) => {
    const { compLocation, handleClickButton } = props;

    return (
        <div className="flex flex-row text-l mt-3 font-bold items-center justify-between border-b border-gray-500 border-solid">
            <h3>{`${compLocation.city} - Skupina ${compLocation.group}, ${compLocation.date}`}</h3>
            <div>
                <OrangeButton 
                    buttonType="button"
                    buttonText="Upraviť skupinu"
                    buttonName="edit"
                    size="sm"
                    clickAction={handleClickButton}
                />
                <RedButton
                    buttonType="button"
                    buttonText="Zmazať skupinu"
                    buttonName="delete"
                    size="sm"
                    clickAction={handleClickButton}
                />
            </div>                    
        </div>
    );
};
export default ContentBlockItem;