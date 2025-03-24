import { MouseEvent, useState } from "react";
//Types
import { CompetitionLocation } from "../../assets/types/competitionTypes";
//Components
import ContentBlockHeader from "./ContentBlockHeader";
import ContentBlockItem from "./ContentBlockItem";

interface Props {
    headerTitle: string
    locations: CompetitionLocation[]
}

const ContentBlock: React.FC<Props> = (props) => {

    const { headerTitle, locations } = props;
    console.log(`Locations: ${JSON.stringify(locations)}`);

    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
        console.log("Edit button clicked");
    };
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        console.log("Delete button clicked");
    }

    
    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg mx-10 my-6 border border-gray-500 border-solid p-4 bg-gray-800 text-white">
            <ContentBlockHeader
                headerTitle={headerTitle}
            />
            <div className="pt-6 pl-10">
                <ContentBlockItem 
                
                />
            </div>            
        </div>
    );
};
export default ContentBlock;