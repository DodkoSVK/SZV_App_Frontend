// React
import { useEffect, useState } from "react";
//Types
import { Competition } from "@/assets/types/competitionTypes";
// ShadUi Components
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
interface Props {
    competitions: Competition[];
    selectingCompetitions: (selected: number[]) => void;
    clearSelectCompetitions: boolean;
}

const CompetitionsBlock: React.FC<Props> = (props) => {
    // Props
    const { competitions, selectingCompetitions, clearSelectCompetitions } = props;
    // UseStates
    const [localCompetitions, setLocalCompetitions] = useState<Competition[]>([])
    const [selectedCompetitions, setSelectedCompetitions] = useState<Set<number>>(new Set());

    const roundColors: Record<number, string> = {
        1: "border-blue-500",
        2: "border-green-500",
        3: "border-yellow-500",
        4: "border-red-500",
    };
    
    // Function to handle check competitions
    const toggleCompetition = (id: number, checked: boolean) => {
        setSelectedCompetitions(prev => {
            const newSet = new Set(prev);
            if (checked)
                newSet.add(id);
            else 
                newSet.delete(id);
            
            return newSet;
        });
    };
    
    useEffect(() => {
        if (clearSelectCompetitions) {
            setSelectedCompetitions(new Set());
            selectingCompetitions([]); // pošleme späť prázdny výber
        }
    
        // Po 1 "tiku" vrátime späť false
        const timeout = setTimeout(() => {
            // notifikujeme rodiča, že bol reset spravený
            // najlepší spôsob je cez callback, ale ak nie je, urobíme to cez prop
            // (nižšie ti ukážem ako)
        }, 100);
    
        return () => clearTimeout(timeout);
    }, [clearSelectCompetitions]);
    // Send selected competitions ID(s) to competition component after render complete
    useEffect(() => {
        selectingCompetitions(Array.from(selectedCompetitions));
    }, [selectedCompetitions]);

    // Load competitions to local useState
    useEffect(() => {
        setLocalCompetitions(competitions); 
    }, [competitions]);
    return (
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            { Array.isArray(localCompetitions) && localCompetitions.length > 0 ? (
                localCompetitions.map(competition => (
                    <Card key={competition.id} className={`w-full border-1 ${roundColors[competition.round] ?? "border-gray-300"}`}>
                        <CardHeader className="flex flex-row justify-start items-center gap-4 text-2xl">
                            <Checkbox
                                checked = {selectedCompetitions.has(competition.id)}
                                onCheckedChange={(checked) => toggleCompetition(competition.id, checked === true)}
                            />
                            <CardTitle>
                                {`${competition.round}. Kolo, ${competition.league_name}, ${competition.date}`}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold mb-2">Skupiny</h3>
                            <ul className="space-y-4">
                                {competition.locations.map(location => (
                                    <li key={`${competition.id}.${location.id}`}>
                                        <p className="font-semibold">{`Skupina: ${location.group}`}</p>
                                        <p className="text-sm">- {`Usporiadateľ: ${location.club_name}`}</p>
                                        <p className="text-sm">- {`Mesto: ${location.city}`}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>                        
                    </Card>
                ))
            ) : null }

        </article>
        

    );

}

export default CompetitionsBlock