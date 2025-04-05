//Types
import { CompetitionLocation } from "../../assets/types/competitionTypes";

interface Props {
    compLocation: CompetitionLocation
}

const ContentBlockItem: React.FC<Props> = (props) => {
    const { compLocation } = props;

    return (
        <div className="flex flex-row text-l pt-4 font-bold items-center justify-between border-b border-gray-500 border-solid">
            <h3>{`${compLocation.city} - Skupina ${compLocation.group}, ${compLocation.date}`}</h3>                    
        </div>
    );
};
export default ContentBlockItem;