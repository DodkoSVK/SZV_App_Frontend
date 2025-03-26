import { MouseEvent } from "react";
//Components
import OrangeButton  from "../buttons/OrangeButton";
import RedButton from "../buttons/RedButton";
import GreenButton from "../buttons/GreenButton";

interface Props {
    headerTitle: string
    competitionId: number
    handleClickButton: (type: boolean, id: number, e: MouseEvent<HTMLButtonElement>) => void
}

const ContentBlockHeader: React.FC<Props> = (props) => {
    const { headerTitle, competitionId, handleClickButton } = props;

    return (
        <div className="flex flex-row justify-between items-center border-b border-gray-500 border-solid">
                <h2 className="text-xl font-bold pl-4">
                    {headerTitle}
                </h2>
                <div className="pr-4">
                    <GreenButton
                        buttonType="button"
                        buttonText="Pridať skupinu"
                        buttonName="create"
                        size="sm"
                        clickAction={(e) => handleClickButton(true,competitionId, e)}
                    />
                    <OrangeButton 
                        buttonType="button"
                        buttonText="Upraviť súťaž"
                        buttonName="edit"
                        size="sm"
                        clickAction={(e) => handleClickButton(false,competitionId, e)}
                    />
                    <RedButton
                        buttonType="button"
                        buttonText="Zmazať súťaž"
                        buttonName="delete"
                        size="sm"
                        clickAction={(e) => handleClickButton(false,competitionId, e)}
                    />
                </div>
            </div>
    );
};

export default ContentBlockHeader;