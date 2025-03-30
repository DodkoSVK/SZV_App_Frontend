import { MouseEvent } from "react";
//Types
import { CompetitionLocation } from "../../assets/types/competitionTypes";
//Components
import ContentBlockHeader from "./ContentBlockHeader";
import ContentBlockItem from "./ContentBlockItem";

interface Props {
    headerTitle: string;
    competitionID: number;
    locations?: CompetitionLocation[];
    handleClickButton: (type: boolean, id: number, e: MouseEvent<HTMLButtonElement>) => void;
}

const ContentBlock: React.FC<Props> = (props) => {

    const { headerTitle, competitionID, locations, handleClickButton } = props;
    //console.log(`Locations: ${JSON.stringify(locations)}`);  

    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg mx-10 my-6 border border-gray-500 border-solid p-4 bg-gray-800 text-white">
            <ContentBlockHeader 
                headerTitle={headerTitle}
                competitionId={competitionID}
                handleClickButton={handleClickButton}/>
            <div className=" pl-10">
                {Array.isArray(locations) && locations.length > 0 ? (
                    locations.map(location => (
                        <ContentBlockItem 
                            key={location.id} 
                            compLocation={location}
                        />
                    ))
                ) : (
                    <p>Žiadne lokality</p>
                )}
            </div>            
        </div>
    );
    
};
export default ContentBlock;