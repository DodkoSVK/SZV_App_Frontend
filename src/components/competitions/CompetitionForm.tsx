//Types
import { ChangeEvent, useState } from "react";
import { Competition } from "../../assets/types/competitionTypes";
//Childrens
import InputElement from "../forms/InputElement";


interface Props {
    formTitle?: string;
    competitionData: Competition
}

const CompetitionForm: React.FC<Props> = (props) => {
    const [competition, setCompetition] = useState<Competition>();

    const { formTitle, competitionData } = props;

    const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.id === "compId")
            setCompetition({ ...competition, league:e.target.value})
    }

    return (
        <section>
            <div className="fixed inset-0 z-49 flex items-center justify-center backdrop-filter backdrop-blur-xs">
                <div className="w-full bg-[#0B3C5D] rounded-lg shadow border border-gray-500 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F7F9FB] md:text-2xl">
                            {formTitle}
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <InputElement 
                                inputValue={competitionData.league}
                                inputLabel="Súťaž"
                                inputName="compId"
                                handleOnChange={handleInputsChange}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default CompetitionForm;